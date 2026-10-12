import { NextRequest, NextResponse } from 'next/server';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';
import type { OrderStatus, OrderRecord } from '@/lib/types';

export const dynamic = 'force-dynamic';

const ADMIN_SECRET = process.env.ADMIN_KEY || process.env.ADMIN_SECRET || 'admin5225';

function isAuthorized(request: NextRequest): boolean {
  const headerKey = request.headers.get('x-admin-key');
  const queryKey = request.nextUrl.searchParams.get('key');
  const authKey = headerKey || queryKey;
  return Boolean(authKey && authKey.trim() === ADMIN_SECRET);
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const { id: orderIdentifier } = await params;
    const body = await request.json().catch(() => null);

    if (!body || !body.status) {
      return NextResponse.json(
        { success: false, error: 'Missing required status field.' },
        { status: 400 }
      );
    }

    const validStatuses: OrderStatus[] = [
      'PENDING_REVIEW',
      'PAYMENT_CONFIRMED',
      'FULFILLMENT_IN_PROGRESS',
      'COMPLETED',
      'REJECTED',
      'REFUND_REQUESTED',
      'REFUNDED',
    ];

    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status: ${body.status}` },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const isCompletedOrReviewed = body.status !== 'PENDING_REVIEW';
    let updatedOrder: OrderRecord | null = null;

    // 1. Update in-memory dev store if present
    if (globalThis.__devOrders) {
      // Find either by id or order_reference
      for (const [ref, ord] of globalThis.__devOrders.entries()) {
        if (ord.id === orderIdentifier || ord.order_reference === orderIdentifier) {
          const updated: OrderRecord = {
            ...ord,
            status: body.status,
            admin_notes: body.admin_notes !== undefined ? body.admin_notes : ord.admin_notes,
            updated_at: now,
            reviewed_at: isCompletedOrReviewed ? ord.reviewed_at || now : null,
          };
          globalThis.__devOrders.set(ref, updated);
          updatedOrder = updated;
          break;
        }
      }
    }

    // 2. Update Supabase if configured
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServiceClient();
        const updatePayload: Record<string, unknown> = {
          status: body.status,
          updated_at: now,
        };
        if (body.admin_notes !== undefined) {
          updatePayload.admin_notes = body.admin_notes;
        }
        if (isCompletedOrReviewed) {
          updatePayload.reviewed_at = now;
        }

        const { data: dbData, error: dbError } = await supabase
          .from('orders')
          .update(updatePayload)
          .or(`id.eq.${orderIdentifier},order_reference.eq.${orderIdentifier}`)
          .select()
          .single();

        if (!dbError && dbData) {
          updatedOrder = dbData as OrderRecord;
        }
      } catch (err) {
        console.warn('Supabase order update note:', err);
      }
    }

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: 'Order not found to update.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedOrder,
      message: `Order status successfully updated to ${body.status}`,
    });
  } catch (error) {
    console.error('Update order error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error updating order.' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ success: false, error: 'Unauthorized.' }, { status: 401 });
    }

    const { id: orderIdentifier } = await params;
    let deleted = false;

    // Delete from dev memory
    if (globalThis.__devOrders) {
      for (const [ref, ord] of globalThis.__devOrders.entries()) {
        if (ord.id === orderIdentifier || ord.order_reference === orderIdentifier) {
          globalThis.__devOrders.delete(ref);
          deleted = true;
          break;
        }
      }
    }

    // Delete from Supabase
    if (isSupabaseConfigured()) {
      try {
        const supabase = getServiceClient();
        await supabase
          .from('orders')
          .delete()
          .or(`id.eq.${orderIdentifier},order_reference.eq.${orderIdentifier}`);
        deleted = true;
      } catch (err) {
        console.warn('Supabase delete notice:', err);
      }
    }

    return NextResponse.json({
      success: true,
      message: deleted ? 'Order removed.' : 'Order was not found.',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete order.' },
      { status: 500 }
    );
  }
}
