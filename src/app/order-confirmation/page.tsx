'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  CheckCircle2,
  Clock,
  Package,
  Calendar,
  Hash,
  ArrowLeft,
  Loader2,
  AlertTriangle,
  Copy,
  Check,
  MessageCircle,
  ShieldCheck,
  Printer,
  Sparkles,
} from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

interface OrderData {
  orderReference: string;
  productName: string;
  subscriptionDuration: string;
  amountBdt: number;
  paymentMethod: string;
  submissionTimestamp: string;
  status: string;
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const ref = searchParams.get('ref');

  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (!ref) {
      setError('No order reference provided.');
      setLoading(false);
      return;
    }

    async function fetchOrder() {
      try {
        const response = await fetch(`/api/orders/lookup?ref=${encodeURIComponent(ref!)}`);
        const result = await response.json();

        if (!response.ok || !result.success) {
          setError(result.error || 'Order reference could not be located.');
          return;
        }

        setOrder(result.data);
      } catch {
        setError('Failed to retrieve order details. Please verify your connection.');
      } finally {
        setLoading(false);
      }
    }

    fetchOrder();
  }, [ref]);

  const copyRef = () => {
    if (!order) return;
    navigator.clipboard.writeText(order.orderReference);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
        <p className="text-slate-300 text-xs sm:text-sm font-mono tracking-wider">
          Retrieving encrypted order receipt...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center max-w-md mx-auto p-6 sm:p-8 glass-panel border border-red-500/20 rounded-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white">Order Reference Not Found</h1>
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          {error || 'We could not locate this order reference in our records. Please verify the code from your browser URL.'}
        </p>
        <Link href="/" className="btn-primary mt-2 text-xs sm:text-sm px-6 py-3">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(order.submissionTimestamp).toLocaleString('en-BD', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  return (
    <div className="max-w-3xl mx-auto">
      
      {/* Success Status Header */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-5 rounded-2xl sm:rounded-3xl bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-400" />
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
          <span>Order Logged Successfully</span>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
          Your Student Pass Is Under Review.
        </h1>
        <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          We have recorded your details. Our verification desk is reconciling your MFS payment.
        </p>
      </div>

      {/* Visual Fulfillment Pipeline Tracker - Mobile Stacked */}
      <div className="mb-6 sm:mb-10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/[0.1]">
        <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 sm:mb-6 font-mono text-center">
          Fulfillment Stage Progress
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          
          {/* Stage 1: Submitted */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">1. Form Submitted</span>
              <span className="text-[10px] text-emerald-300 font-mono">Recorded in database</span>
            </div>
          </div>

          {/* Stage 2: MFS Review */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-indigo-500/15 border border-indigo-500/40 flex items-center gap-3 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-indigo-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin" />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">2. MFS Review</span>
              <span className="text-[10px] text-cyan-300 font-mono">In verification</span>
            </div>
          </div>

          {/* Stage 3: Activation */}
          <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-slate-500 flex-shrink-0">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400 block">3. Email Activation</span>
              <span className="text-[10px] text-slate-500 font-mono">SLA: 2–12 Hours</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main VIP Digital Receipt Card */}
      <div className="glass-panel-elevated p-5 sm:p-7 md:p-9 rounded-2xl sm:rounded-3xl border border-white/[0.14] mb-6 sm:mb-8 relative overflow-hidden shadow-2xl">
        
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-5 border-b border-white/[0.08] mb-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-navy-950 rounded-[10px] sm:rounded-[14px] flex items-center justify-center">
                <Package className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Digital Pass Receipt</h2>
              <span className="text-[10px] sm:text-xs text-slate-400 font-mono">Dhaka Verification Desk</span>
            </div>
          </div>

          {/* Copyable Order Reference */}
          <div className="flex items-center justify-between sm:justify-start gap-2 bg-navy-950/80 p-1.5 sm:p-0 rounded-xl">
            <div className="px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/[0.1] font-mono text-xs sm:text-sm font-bold text-cyan-400">
              {order.orderReference}
            </div>
            <button
              onClick={copyRef}
              className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-lg bg-white/[0.06] hover:bg-white/[0.12] active:scale-95 text-slate-300 hover:text-white transition-all cursor-pointer"
              aria-label="Copy order reference"
            >
              {copiedRef ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Receipt Line Items */}
        <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm">
          <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
            <span className="text-slate-400 flex items-center gap-2">
              <Package className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              Product
            </span>
            <span className="font-bold text-white">{order.productName}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
            <span className="text-slate-400 flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              Duration
            </span>
            <span className="font-bold text-cyan-300 font-mono">{order.subscriptionDuration}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
            <span className="text-slate-400 flex items-center gap-2">
              <Hash className="w-4 h-4 text-purple-400 flex-shrink-0" />
              Method
            </span>
            <span className="font-bold text-white px-2 py-0.5 rounded bg-white/[0.06] border border-white/[0.1]">
              {order.paymentMethod}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
              Timestamp
            </span>
            <span className="text-slate-300 font-mono text-[11px] sm:text-xs text-right">{formattedDate}</span>
          </div>

          <div className="flex justify-between items-center pt-2.5">
            <span className="text-sm sm:text-base font-bold text-white">Amount Paid</span>
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-mono">
                ৳{order.amountBdt}
              </span>
              <span className="text-xs text-slate-400 font-mono ml-1">BDT</span>
            </div>
          </div>
        </div>

        {/* Mobile-Friendly Full-Width Action Buttons */}
        <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <a
            href={`https://wa.me/8801704184297?text=${encodeURIComponent(
              `Hello! I just placed an order on SubsCrypto. Order Ref: ${order.orderReference}. Could you please check my status?`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto py-3.5 px-6 text-xs sm:text-sm font-bold rounded-xl flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>

          <button
            onClick={() => window.print()}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.08] text-xs font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Printer className="w-4 h-4" />
            <span>Print Receipt</span>
          </button>
        </div>

      </div>

      {/* Helpful Guidance */}
      <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl glass-panel border border-white/[0.08] text-xs text-slate-300 leading-relaxed space-y-2 mb-8">
        <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 mb-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          What Happens Next?
        </h4>
        <p>
          • <strong>Confirmation Email:</strong> Once our verification team cross-checks your TrxID with the {order.paymentMethod} ledger, an activation dispatch will be sent directly to your submitted Google account.
        </p>
        <p>
          • <strong>Need quick help?</strong> WhatsApp our Dhaka desk at <span className="font-mono text-emerald-400">+880 1704-184297</span> with your order reference <strong className="font-mono text-white">{order.orderReference}</strong>.
        </p>
      </div>

    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-32 sm:pt-36 pb-16 sm:pb-20 relative overflow-hidden">
        <div className="container-main relative z-10">
          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                <p className="text-slate-400 text-xs sm:text-sm font-mono">Loading order status...</p>
              </div>
            }
          >
            <OrderConfirmationContent />
          </Suspense>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
