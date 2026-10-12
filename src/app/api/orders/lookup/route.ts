import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const ref = request.nextUrl.searchParams.get('ref');

    if (!ref || !/^ORD-[A-Z0-9]{8}$/.test(ref)) {
      return NextResponse.json(
        { success: false, error: 'Invalid order reference format.' },
        { status: 400 }
      );
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      // Dev fallback: check in-memory store
      const devOrder = globalThis.__devOrders?.get(ref);
      if (!devOrder) {
        return NextResponse.json(
          { success: false, error: 'Order not found.' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          orderReference: devOrder.order_reference,
          productName: 'Google AI Pro',
          subscriptionDuration: `${devOrder.subscription_duration_months} Months`,
          amountBdt: devOrder.amount_bdt,
          paymentMethod: devOrder.payment_method,
          submissionTimestamp: devOrder.created_at,
          status: devOrder.status,
        },
      });
    }

    // Supabase lookup - only return non-sensitive fields
    const supabase = getServiceClient();
    const { data, error } = await supabase
      .from('orders')
      .select('order_reference, product_code, subscription_duration_months, amount_bdt, payment_method, status, created_at, currency')
      .eq('order_reference', ref)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { success: false, error: 'Order not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        orderReference: data.order_reference,
        productName: 'Google AI Pro',
        subscriptionDuration: `${data.subscription_duration_months} Months`,
        amountBdt: data.amount_bdt,
        paymentMethod: data.payment_method,
        submissionTimestamp: data.created_at,
        status: data.status,
      },
    });
  } catch (error) {
    console.error('Order lookup error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to look up order.' },
      { status: 500 }
    );
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __devOrders: Map<string, any> | undefined;
}
