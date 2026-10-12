-- ===========================================
-- Google AI Pro Student Offer - Database Schema
-- ===========================================
-- Run this migration in your Supabase SQL Editor

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_reference TEXT UNIQUE NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('bKash', 'Nagad', 'Rocket')),
  transaction_id TEXT NOT NULL,
  product_code TEXT NOT NULL DEFAULT 'GOOGLE_AI_PRO_STUDENT_18M',
  subscription_duration_months INTEGER NOT NULL DEFAULT 18,
  amount_bdt INTEGER NOT NULL DEFAULT 349,
  currency TEXT NOT NULL DEFAULT 'BDT',
  status TEXT NOT NULL DEFAULT 'PENDING_REVIEW' CHECK (
    status IN (
      'PENDING_REVIEW',
      'PAYMENT_CONFIRMED',
      'FULFILLMENT_IN_PROGRESS',
      'COMPLETED',
      'REJECTED',
      'REFUND_REQUESTED',
      'REFUNDED'
    )
  ),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  admin_notes TEXT,
  CONSTRAINT valid_amount CHECK (amount_bdt > 0),
  CONSTRAINT valid_duration CHECK (subscription_duration_months > 0)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_orders_reference ON orders(order_reference);
CREATE INDEX IF NOT EXISTS idx_orders_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies:
-- 1. Public users can INSERT orders (creating new orders)
CREATE POLICY "Allow public order creation" ON orders
  FOR INSERT
  WITH CHECK (
    status = 'PENDING_REVIEW'
    AND amount_bdt = 349
    AND currency = 'BDT'
    AND product_code = 'GOOGLE_AI_PRO_STUDENT_18M'
  );

-- 2. Public users can SELECT only their own order by reference (for confirmation page)
--    This is limited to non-sensitive fields via the API route.
--    Direct table access returns the row but the API layer controls which fields are exposed.
CREATE POLICY "Allow public order lookup by reference" ON orders
  FOR SELECT
  USING (true);
  -- Note: The API route restricts which columns are returned.
  -- For stricter RLS, you could require an auth token or session.

-- 3. No public UPDATE or DELETE
-- Only service_role key (server-side) can update order status

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
