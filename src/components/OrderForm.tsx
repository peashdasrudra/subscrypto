'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, ArrowRight, Loader2, Lock } from 'lucide-react';
import { CLIENT_OFFER_CONFIG } from '@/lib/config';
import { orderSubmissionSchema, type OrderSubmissionInput } from '@/lib/validation';
import type { PaymentMethod } from '@/lib/types';

interface OrderFormProps {
  selectedMethod: PaymentMethod;
}

export default function OrderForm({ selectedMethod }: OrderFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<OrderSubmissionInput>({
    resolver: zodResolver(orderSubmissionSchema),
    defaultValues: {
      paymentMethod: selectedMethod,
      termsAccepted: false,
    },
  });

  // Sync selected payment method from parent safely inside useEffect
  useEffect(() => {
    if (selectedMethod) {
      setValue('paymentMethod', selectedMethod);
    }
  }, [selectedMethod, setValue]);

  const onSubmit = async (data: OrderSubmissionInput) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Something went wrong. Please check your details and try again.');
      }

      // Redirect to confirmation page with ref
      router.push(`/order-confirmation?ref=${encodeURIComponent(result.data.orderReference)}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Failed to submit order. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="glass-panel-elevated p-5 sm:p-7 md:p-8 border border-white/[0.12] rounded-2xl sm:rounded-3xl">
      
      {/* Header */}
      <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/[0.08]">
        <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-bold block mb-1">
          Step 2 of 2 · Order Submission
        </span>
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
          Enter Your Transaction Details
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
          Provide your details for MFS transaction reconciliation and prompt delivery.
        </p>
      </div>

      {/* Submission Error Banner */}
      {submitError && (
        <div className="mb-5 sm:mb-6 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-3" role="alert">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-bold text-red-300">Submission Blocked</h4>
            <p className="text-xs text-red-300/90 mt-0.5 leading-relaxed">{submitError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4 sm:space-y-5">
        
        {/* Full Name */}
        <div>
          <label htmlFor="customerName" className="form-label text-xs sm:text-sm">
            Full Name <span className="text-rose-400">*</span>
          </label>
          <input
            id="customerName"
            type="text"
            className="form-input text-base"
            placeholder="e.g. Tanvir Ahmed"
            autoComplete="name"
            aria-invalid={!!errors.customerName}
            aria-describedby={errors.customerName ? 'customerName-error' : undefined}
            {...register('customerName')}
          />
          {errors.customerName ? (
            <p id="customerName-error" className="form-error" role="alert">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.customerName.message}</span>
            </p>
          ) : (
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">Your name for subscription records</span>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="customerEmail" className="form-label text-xs sm:text-sm">
            Google Account Email <span className="text-rose-400">*</span>
          </label>
          <input
            id="customerEmail"
            type="email"
            className="form-input text-base"
            placeholder="e.g. yourname@gmail.com"
            autoComplete="email"
            autoCapitalize="none"
            aria-invalid={!!errors.customerEmail}
            aria-describedby={errors.customerEmail ? 'customerEmail-error' : undefined}
            {...register('customerEmail')}
          />
          {errors.customerEmail ? (
            <p id="customerEmail-error" className="form-error" role="alert">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.customerEmail.message}</span>
            </p>
          ) : (
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
              Where Gemini 3 Pro & 5 TB cloud storage will be activated.
            </span>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="customerPhone" className="form-label text-xs sm:text-sm">
            Bangladeshi Contact Phone <span className="text-rose-400">*</span>
          </label>
          <input
            id="customerPhone"
            type="tel"
            inputMode="tel"
            className="form-input font-mono text-base"
            placeholder="017XXXXXXXX"
            autoComplete="tel"
            aria-invalid={!!errors.customerPhone}
            aria-describedby={errors.customerPhone ? 'customerPhone-error' : undefined}
            {...register('customerPhone')}
          />
          {errors.customerPhone ? (
            <p id="customerPhone-error" className="form-error" role="alert">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.customerPhone.message}</span>
            </p>
          ) : (
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
              Used for SMS and WhatsApp delivery tracking (11 digits).
            </span>
          )}
        </div>

        {/* Payment Method Badge */}
        <div>
          <label className="form-label text-xs sm:text-sm">Selected Payment Method</label>
          <div className="p-3 rounded-xl bg-navy-950 border border-white/[0.08] flex items-center justify-between">
            <span className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              {selectedMethod}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Amount: ৳349 BDT
            </span>
          </div>
          <input type="hidden" {...register('paymentMethod')} value={selectedMethod} />
        </div>

        {/* Transaction ID */}
        <div>
          <label htmlFor="transactionId" className="form-label text-xs sm:text-sm flex items-center justify-between">
            <span>
              {selectedMethod} Transaction ID (TrxID) <span className="text-rose-400">*</span>
            </span>
            <span className="text-[10px] text-cyan-400 font-mono">8–12 Chars</span>
          </label>
          <input
            id="transactionId"
            type="text"
            autoCapitalize="characters"
            autoCorrect="off"
            spellCheck="false"
            className="form-input font-mono uppercase tracking-widest text-base font-bold text-cyan-300"
            placeholder="e.g. BL4591X9 or 9K28401L"
            aria-invalid={!!errors.transactionId}
            aria-describedby={errors.transactionId ? 'transactionId-error' : undefined}
            {...register('transactionId')}
          />
          {errors.transactionId ? (
            <p id="transactionId-error" className="form-error" role="alert">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.transactionId.message}</span>
            </p>
          ) : (
            <span className="text-[10px] sm:text-[11px] text-slate-500 mt-1 block">
              Found on your {selectedMethod} confirmation SMS or statement.
            </span>
          )}
        </div>

        {/* Terms Acceptance */}
        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-white/20 bg-navy-950 text-indigo-600 focus:ring-indigo-500 mt-0.5 cursor-pointer flex-shrink-0"
              {...register('termsAccepted')}
            />
            <span className="text-xs text-slate-300 leading-relaxed group-hover:text-white transition-colors">
              I have sent ৳{CLIENT_OFFER_CONFIG.pricing.amount} to <span className="font-mono text-cyan-400">{CLIENT_OFFER_CONFIG.payment.recipientNumber}</span> via {selectedMethod} and verify that my email above is correct.
            </span>
          </label>
          {errors.termsAccepted && (
            <p className="form-error mt-1.5">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              <span>{errors.termsAccepted.message}</span>
            </p>
          )}
        </div>

        {/* Submit Action Button */}
        <div className="pt-3 sm:pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full min-h-[52px] py-3.5 sm:py-4 text-sm sm:text-base font-bold rounded-xl shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Verifying and Logging...</span>
              </>
            ) : (
              <>
                <span>Submit Order for Review</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>

        {/* Security Note */}
        <div className="pt-1 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lock className="w-3.5 h-3.5 flex-shrink-0" />
          <span>Encrypted with Row-Level Security · Zero Password Storage</span>
        </div>

      </form>
    </div>
  );
}
