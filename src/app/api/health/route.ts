import { NextResponse } from 'next/server';
import { getServiceClient, isSupabaseConfigured } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const configured = isSupabaseConfigured();
  let dbStatus = 'unconfigured';
  let latencyMs: number | null = null;

  if (configured) {
    try {
      const startTime = Date.now();
      const supabase = getServiceClient();
      const { error } = await supabase.from('orders').select('id').limit(1);
      latencyMs = Date.now() - startTime;

      if (error) {
        dbStatus = `error: ${error.message}`;
      } else {
        dbStatus = 'connected';
      }
    } catch (err) {
      dbStatus = `error: ${err instanceof Error ? err.message : 'Unknown database error'}`;
    }
  }

  return NextResponse.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: {
      configured,
      status: dbStatus,
      latencyMs,
    },
  });
}
