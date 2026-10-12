import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import z from 'zod';
import { orderSubmissionSchema } from '@/lib/validation';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count++;
  return false;
}

function generateOrderReference(): string {
  // Format: ORD-XXXXXXXX (8 uppercase alphanumeric chars)
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoiding ambiguous chars
  let ref = 'ORD-';
  for (let i = 0; i < 8; i++) {
    ref += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return ref;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }

    // Parse body
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { success: false, error: 'Invalid request body.' },
        { status: 400 }
      );
    }

    // Validate with Zod
    const validation = orderSubmissionSchema.safeParse(body);
    if (!validation.success) {
      const firstError = validation.error.issues[0];
      return NextResponse.json(
        {
          success: false,
          error: firstError?.message || 'Validation failed. Please check your input.',
          fieldErrors: z.flattenError(validation.error).fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Server-controlled values — never trust the client
    const OFFER_PRICE = parseInt(process.env.OFFER_PRICE_BDT || '349', 10);
    const OFFER_DURATION = parseInt(process.env.OFFER_DURATION_MONTHS || '18', 10);
    const PRODUCT_CODE = 'GOOGLE_AI_PRO_STUDENT_18M';

    // Validate payment method against allowlist
    const allowedMethods = ['bKash', 'Nagad', 'Rocket'];
    if (!allowedMethods.includes(data.paymentMethod)) {
      return NextResponse.json(
        { success: false, error: 'Unsupported payment method.' },
        { status: 400 }
      );
    }

    // Generate order reference
    const orderReference = generateOrderReference();
    const orderId = uuidv4();
    const now = new Date().toISOString();

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Fallback: Store in-memory for development (not for production)
      // Fallback: Store in-memory for development (not for production)
      console.log('⚠️ Supabase not configured. Order stored in memory only.');
      console.log('Order:', {
        id: orderId,
        orderReference,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        amountBdt: OFFER_PRICE,
        status: 'PENDING_REVIEW',
        createdAt: now,
      });

      // Store in global for dev
      if (!globalThis.__devOrders) {
        globalThis.__devOrders = new Map();
      }
      globalThis.__devOrders.set(orderReference, {
        id: orderId,
        order_reference: orderReference,
        customer_name: data.customerName,
        customer_email: data.customerEmail,
        customer_phone: data.customerPhone,
        payment_method: data.paymentMethod,
        transaction_id: data.transactionId,
        product_code: PRODUCT_CODE,
        subscription_duration_months: OFFER_DURATION,
        amount_bdt: OFFER_PRICE,
        currency: 'BDT',
        status: 'PENDING_REVIEW',
        created_at: now,
        updated_at: now,
        reviewed_at: null,
        admin_notes: null,
      });

      return NextResponse.json(
        {
          success: true,
          data: {
            orderReference,
            status: 'PENDING_REVIEW',
            amountBdt: OFFER_PRICE,
            paymentMethod: data.paymentMethod,
            productName: 'Google AI Pro',
            subscriptionDuration: `${OFFER_DURATION} Months`,
            submissionTimestamp: now,
          },
        },
        { status: 201 }
      );
    }

    // Supabase is configured — persist to database
    const supabase = getServiceClient();

    const { error: dbError } = await supabase.from('orders').insert({
      id: orderId,
      order_reference: orderReference,
      customer_name: data.customerName,
      customer_email: data.customerEmail,
      customer_phone: data.customerPhone,
      payment_method: data.paymentMethod,
      transaction_id: data.transactionId,
      product_code: PRODUCT_CODE,
      subscription_duration_months: OFFER_DURATION,
      amount_bdt: OFFER_PRICE,
      currency: 'BDT',
      status: 'PENDING_REVIEW',
      created_at: now,
      updated_at: now,
    });

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Failed to record your order. Please try again.' },
        { status: 500 }
      );
    }

    // Attempt to send email notifications (non-blocking)
    try {
      await sendNotifications({
        orderReference,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        paymentMethod: data.paymentMethod,
        transactionId: data.transactionId,
        amountBdt: OFFER_PRICE,
        submissionTimestamp: now,
      });
    } catch (emailError) {
      // Email failure should not fail the order
      console.error('Email notification failed:', emailError);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          orderReference,
          status: 'PENDING_REVIEW',
          amountBdt: OFFER_PRICE,
          paymentMethod: data.paymentMethod,
          productName: 'Google AI Pro',
          subscriptionDuration: `${OFFER_DURATION} Months`,
          submissionTimestamp: now,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Order submission error:', error);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    );
  }
}

// Email notification helper
async function sendNotifications(order: {
  orderReference: string;
  customerName: string;
  customerEmail: string;
  paymentMethod: string;
  transactionId: string;
  amountBdt: number;
  submissionTimestamp: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ORDER_NOTIFICATION_EMAIL;

  if (!resendKey) {
    console.log('ℹ️ Resend API key not configured. Skipping email notifications.');
    return;
  }

  const fromEmail = 'orders@resend.dev'; // Use verified domain in production

  // Customer confirmation email
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: order.customerEmail,
        subject: `We Received Your Order — ${order.orderReference}`,
        html: `
          <div style="font-family: 'Inter', system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 24px; background: #080D1C; color: #F8FAFC;">
            <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 8px;">Order Received</h1>
            <p style="color: #AAB4C5; margin-bottom: 24px;">Thank you for your submission, ${order.customerName}.</p>

            <div style="background: #111827; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 12px;"><strong>Order Reference:</strong> ${order.orderReference}</p>
              <p style="margin: 0 0 12px;"><strong>Product:</strong> Google AI Pro — 18 Months</p>
              <p style="margin: 0 0 12px;"><strong>Amount:</strong> ৳${order.amountBdt} BDT</p>
              <p style="margin: 0 0 12px;"><strong>Payment Method:</strong> ${order.paymentMethod}</p>
              <p style="margin: 0;"><strong>Status:</strong> Pending Review</p>
            </div>

            <p style="color: #AAB4C5; font-size: 14px; line-height: 1.6;">
              Your payment details have been submitted and are awaiting manual verification.
              You will receive an email update within 12 hours once the review is complete.
            </p>
            <p style="color: #AAB4C5; font-size: 14px; line-height: 1.6;">
              Please note: Submitting the form does not confirm payment verification.
              Your subscription will be processed after successful payment confirmation.
            </p>

            <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0;" />
            <p style="color: #6B7A94; font-size: 12px;">This is an automated message from an independently operated offer website.</p>
          </div>
        `,
      }),
    });
  } catch (e) {
    console.error('Customer email failed:', e);
  }

  // Admin notification
  if (adminEmail) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${resendKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to: adminEmail,
          subject: `New Order Submitted — ${order.orderReference}`,
          html: `
            <div style="font-family: system-ui, sans-serif; max-width: 600px; padding: 24px;">
              <h2>New Order: ${order.orderReference}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Name</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.customerName}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Email</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.customerEmail}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Method</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.paymentMethod}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Transaction ID</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">${order.transactionId}</td></tr>
                <tr><td style="padding: 8px; border-bottom: 1px solid #eee;"><strong>Amount</strong></td><td style="padding: 8px; border-bottom: 1px solid #eee;">৳${order.amountBdt} BDT</td></tr>
                <tr><td style="padding: 8px;"><strong>Submitted</strong></td><td style="padding: 8px;">${order.submissionTimestamp}</td></tr>
              </table>
            </div>
          `,
        }),
      });
    } catch (e) {
      console.error('Admin email failed:', e);
    }
  }
}

// Declare global type for dev storage
declare global {
  // eslint-disable-next-line no-var
  var __devOrders: Map<string, Record<string, unknown>> | undefined;
}
