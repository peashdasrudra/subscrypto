'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Sparkles, Check, MessageCircle, ShieldCheck, Zap, ChevronDown } from 'lucide-react';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import PaymentInstructions from '@/components/PaymentInstructions';
import OrderForm from '@/components/OrderForm';
import type { PaymentMethod } from '@/lib/types';

export default function PaymentPage() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('bKash');
  const [mobileSummaryOpen, setMobileSummaryOpen] = useState(false);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-20 relative overflow-hidden">
        
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/3 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-indigo-600/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-cyan-500/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none" />

        <div className="container-main relative z-10 px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb Back Link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors mb-6 sm:mb-8 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Academic Offer</span>
          </Link>

          {/* Page Heading */}
          <div className="mb-6 sm:mb-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2.5 sm:mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>Checkout Terminal</span>
            </div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2 sm:mb-3">
              Complete Your Student Order.
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              Send ৳349 BDT via your mobile wallet and submit your transaction code below for human review.
            </p>
          </div>

          {/* Mobile-Only Collapsible Order Summary Banner */}
          <div className="lg:hidden mb-6 rounded-2xl glass-panel border border-white/[0.1] overflow-hidden">
            <button
              onClick={() => setMobileSummaryOpen(!mobileSummaryOpen)}
              className="w-full p-4 flex items-center justify-between text-left cursor-pointer active:bg-white/[0.03]"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-cyan-400 flex items-center justify-center">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">
                    Google AI Pro (18 Months)
                  </span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    ৳349 BDT · Saved ৳3,251
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <span>{mobileSummaryOpen ? 'Hide' : 'Details'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileSummaryOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            {mobileSummaryOpen && (
              <div className="p-4 pt-1 border-t border-white/[0.06] text-xs text-slate-300 space-y-2 animate-fade-in">
                <div className="flex justify-between">
                  <span className="text-slate-400">Plan:</span>
                  <span className="font-semibold text-white">Student Subsidy Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration:</span>
                  <span className="font-semibold text-cyan-300 font-mono">18 Calendar Months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Included:</span>
                  <span className="font-semibold text-white">Gemini 2M, NotebookLM, 2TB Storage</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Due:</span>
                  <span className="font-bold text-cyan-400 font-mono text-sm">৳349 BDT (One-Time)</span>
                </div>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-start">
            
            {/* Main Interactive Flow (7 Cols) */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <PaymentInstructions
                selectedMethod={selectedMethod}
                onMethodChange={setSelectedMethod}
              />
              <OrderForm selectedMethod={selectedMethod} />
            </div>

            {/* Sidebar Sticky Receipt & Order Summary Pass (5 Cols, Hidden on small screens or kept sticky on desktop) */}
            <div className="lg:col-span-5 hidden lg:block">
              <div className="glass-panel-elevated p-6 sm:p-7 border border-white/[0.12] rounded-3xl sticky top-28 space-y-6">
                
                {/* Header Badge */}
                <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md">
                      <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                        <Package className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">Order Summary Pass</h3>
                      <span className="text-[10px] font-mono text-slate-400">Bangladeshi Academic Tier</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    ৳3,251 Saved
                  </span>
                </div>

                {/* Line Items */}
                <div className="space-y-3.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Product Allocation</span>
                    <span className="font-bold text-white">Google AI Pro</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Subscription Term</span>
                    <span className="font-bold text-cyan-400 font-mono">18 Calendar Months</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Gemini Model Tier</span>
                    <span className="font-semibold text-white">1.5 Pro (2M Tokens)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Cloud Storage Cap</span>
                    <span className="font-semibold text-white">2TB (2,048 GB)</span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Activation SLA</span>
                    <span className="font-semibold text-emerald-400">Within 2–12 Hours</span>
                  </div>
                </div>

                {/* Total Calculation */}
                <div className="pt-5 border-t border-white/[0.08]">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm text-slate-400 font-medium">Total Amount Due</span>
                    <div className="text-right">
                      <span className="price-display text-4xl">৳349</span>
                      <span className="text-xs text-slate-400 font-mono ml-1.5">BDT</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    One-time payment · Zero recurring subscription fees
                  </p>
                </div>

                {/* Included Features Checklist */}
                <div className="pt-5 border-t border-white/[0.08] space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block mb-1">
                    What&apos;s Included With This Pass
                  </span>
                  {[
                    'Gemini 1.5 Pro with 2M token context',
                    'NotebookLM Plus with audio podcasts & citations',
                    'Veo cinematic video & Imagen 3 visual generators',
                    '2TB Google One cloud backup storage',
                    'Native Google Workspace (Docs/Sheets/Slides) AI',
                  ].map((feat) => (
                    <div key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Live Assistance Widget */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">Need Help Paying?</span>
                    <span className="text-[11px] text-slate-400 block">Our Dhaka desk is online</span>
                  </div>
                  <a
                    href="https://wa.me/8801533679773"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 transition-colors"
                    aria-label="Contact WhatsApp Support"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  );
}
