// ===========================================
// Type Definitions
// ===========================================

export type PaymentMethod = 'bKash' | 'Nagad' | 'Rocket';

export type OrderStatus =
  | 'PENDING_REVIEW'
  | 'PAYMENT_CONFIRMED'
  | 'FULFILLMENT_IN_PROGRESS'
  | 'COMPLETED'
  | 'REJECTED'
  | 'REFUND_REQUESTED'
  | 'REFUNDED';

export interface OrderSubmission {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  paymentMethod: PaymentMethod;
  transactionId: string;
  termsAccepted: boolean;
}

export interface OrderRecord {
  id: string;
  order_reference: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  payment_method: PaymentMethod;
  transaction_id: string;
  product_code: string;
  subscription_duration_months: number;
  amount_bdt: number;
  currency: string;
  status: OrderStatus;
  created_at: string;
  updated_at: string;
  reviewed_at: string | null;
  admin_notes: string | null;
}

export interface OrderConfirmationData {
  orderReference: string;
  productName: string;
  subscriptionDuration: string;
  amountBdt: number;
  paymentMethod: PaymentMethod;
  submissionTimestamp: string;
  status: OrderStatus;
  supportEmail: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface BenefitCard {
  title: string;
  description: string;
  icon: string;
}

export interface UseCase {
  title: string;
  description: string;
  icon: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
