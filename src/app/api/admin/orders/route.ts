import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';
import type { OrderRecord, OrderStatus, PaymentMethod } from '@/lib/types';

export const dynamic = 'force-dynamic';

const ADMIN_SECRET = process.env.ADMIN_KEY || process.env.ADMIN_SECRET || 'admin5225';

function isAuthorized(request: NextRequest): boolean {
  const headerKey = request.headers.get('x-admin-key');
  const queryKey = request.nextUrl.searchParams.get('key');
  const authKey = headerKey || queryKey;
  return Boolean(authKey && authKey.trim() === ADMIN_SECRET);
}

// Initial realistic demo seed orders for first-time dashboard experience
const initialSeedOrders: OrderRecord[] = [
  {
    id: 'seed-ord-001',
    order_reference: 'ORD-BUET9821',
    customer_name: 'Samiul Hasan',
    customer_email: 'samiul.hasan@ug.cse.buet.ac.bd',
    customer_phone: '01711223344',
    payment_method: 'bKash',
    transaction_id: 'BK9X24LA01',
    product_code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    subscription_duration_months: 18,
    amount_bdt: 349,
    currency: 'BDT',
    status: 'PENDING_REVIEW',
    created_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(), // 14 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    reviewed_at: null,
    admin_notes: null,
  },
  {
    id: 'seed-ord-002',
    order_reference: 'ORD-DU482910',
    customer_name: 'Nafisa Rahman',
    customer_email: 'nafisa.rahman@du.ac.bd',
    customer_phone: '01822334455',
    payment_method: 'Nagad',
    transaction_id: 'NG77A19920',
    product_code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    subscription_duration_months: 18,
    amount_bdt: 349,
    currency: 'BDT',
    status: 'PAYMENT_CONFIRMED',
    created_at: new Date(Date.now() - 1000 * 60 * 52).toISOString(), // 52 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    reviewed_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    admin_notes: 'bKash Trx verified with bank statement. Awaiting Family group batch invite.',
  },
  {
    id: 'seed-ord-003',
    order_reference: 'ORD-NSU71829',
    customer_name: 'Arif Khan',
    customer_email: 'arif.khan02@northsouth.edu',
    customer_phone: '01933445566',
    payment_method: 'Rocket',
    transaction_id: 'RK55BC3921',
    product_code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    subscription_duration_months: 18,
    amount_bdt: 349,
    currency: 'BDT',
    status: 'COMPLETED',
    created_at: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    reviewed_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    admin_notes: 'Invited to Google Family Pool Batch #4. User accepted invite and storage verified.',
  },
  {
    id: 'seed-ord-004',
    order_reference: 'ORD-BRAC3912',
    customer_name: 'Tasnim Ahmed',
    customer_email: 'tasnim.ahmed@g.bracu.ac.bd',
    customer_phone: '01644556677',
    payment_method: 'bKash',
    transaction_id: 'BK12OP9941',
    product_code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    subscription_duration_months: 18,
    amount_bdt: 349,
    currency: 'BDT',
    status: 'PENDING_REVIEW',
    created_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 mins ago
    updated_at: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    reviewed_at: null,
    admin_notes: null,
  },
  {
    id: 'seed-ord-005',
    order_reference: 'ORD-IUT88201',
    customer_name: 'Farhan Mahmud',
    customer_email: 'farhanmahmud@iut-dhaka.edu',
    customer_phone: '01755667788',
    payment_method: 'Nagad',
    transaction_id: 'NG99182310',
    product_code: 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
    subscription_duration_months: 18,
    amount_bdt: 349,
    currency: 'BDT',
    status: 'COMPLETED',
    created_at: new Date(Date.now() - 1000 * 60 * 420).toISOString(), // 7 hours ago
    updated_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    reviewed_at: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
    admin_notes: 'Confirmed and activated.',
  },
];

// Initialize dev store if empty
function ensureDevStore(): Map<string, OrderRecord> {
  if (!globalThis.__devOrders) {
    globalThis.__devOrders = new Map();
    initialSeedOrders.forEach((ord) => {
      globalThis.__devOrders!.set(ord.order_reference, ord);
    });
  } else if (globalThis.__devOrders.size === 0) {
    initialSeedOrders.forEach((ord) => {
      globalThis.__devOrders!.set(ord.order_reference, ord);
    });
  }
  return globalThis.__devOrders as Map<string, OrderRecord>;
}

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Invalid admin passcode.' },
        { status: 401 }
      );
    }

    const devStore = ensureDevStore();
    const ordersMap = new Map<string, OrderRecord>();

    // 1. Try querying Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServiceClient();
        const { data: dbOrders, error: dbError } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!dbError && dbOrders && dbOrders.length > 0) {
          dbOrders.forEach((row) => {
            ordersMap.set(row.order_reference, {
              id: row.id,
              order_reference: row.order_reference,
              customer_name: row.customer_name,
              customer_email: row.customer_email,
              customer_phone: row.customer_phone,
              payment_method: row.payment_method as PaymentMethod,
              transaction_id: row.transaction_id,
              product_code: row.product_code || 'GOOGLE_AI_PRO_GEMINI3_5TB_18M',
              subscription_duration_months: row.subscription_duration_months || 18,
              amount_bdt: row.amount_bdt || 349,
              currency: row.currency || 'BDT',
              status: row.status as OrderStatus,
              created_at: row.created_at,
              updated_at: row.updated_at || row.created_at,
              reviewed_at: row.reviewed_at,
              admin_notes: row.admin_notes,
            });
          });
        }
      } catch (err) {
        console.warn('Admin Supabase fetch notice:', err);
      }
    }

    // 2. Merge in-memory orders (supplements DB with any local dev submissions)
    devStore.forEach((devOrder, ref) => {
      if (!ordersMap.has(ref)) {
        ordersMap.set(ref, devOrder);
      }
    });

    const orders = Array.from(ordersMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    // Calculate live business statistics
    const stats = {
      totalOrders: orders.length,
      pendingReview: orders.filter((o) => o.status === 'PENDING_REVIEW').length,
      paymentConfirmed: orders.filter((o) => o.status === 'PAYMENT_CONFIRMED').length,
      completed: orders.filter((o) => o.status === 'COMPLETED').length,
      rejected: orders.filter((o) => o.status === 'REJECTED').length,
      totalRevenue: orders
        .filter((o) => o.status !== 'REJECTED' && o.status !== 'REFUNDED')
        .reduce((sum, o) => sum + (o.amount_bdt || 349), 0),
    };

    return NextResponse.json({
      success: true,
      data: {
        orders,
        stats,
      },
    });
  } catch (error) {
    console.error('Admin orders API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error fetching orders.' },
      { status: 500 }
    );
  }
}

// POST endpoint to add a new order or seed demo orders
export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const devStore = ensureDevStore();
    const body = await request.json().catch(() => ({}));

    if (body.action === 'seed') {
      initialSeedOrders.forEach((ord) => {
        devStore.set(ord.order_reference, {
          ...ord,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
      });

      return NextResponse.json({
        success: true,
        message: 'Sample demo orders seeded successfully.',
        count: devStore.size,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unrecognized action.' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process admin action.' },
      { status: 500 }
    );
  }
}

declare global {
  // eslint-disable-next-line no-var
  var __devOrders: Map<string, any> | undefined;
}
