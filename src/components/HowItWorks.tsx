import { MousePointerClick, Smartphone, Send, CheckCircle, Clock, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    step: '01',
    time: '30 Sec',
    title: 'Lock In Student Offer',
    description: 'Review the 18-month subsidized parameters (৳349 BDT). Click to proceed to the secure checkout terminal.',
    icon: <MousePointerClick className="w-6 h-6 text-cyan-400" />,
    badge: 'Step 1 · Selection',
  },
  {
    step: '02',
    time: '60 Sec',
    title: 'Send ৳349 via MFS',
    description: 'Open your bKash, Nagad, or Rocket app. Use "Send Money" to recipient 01533679773 or scan our instant QR code. Copy your Transaction ID.',
    icon: <Smartphone className="w-6 h-6 text-indigo-400" />,
    badge: 'Step 2 · Payment',
  },
  {
    step: '03',
    time: '30 Sec',
    title: 'Instant TrxID Verification',
    description: 'Submit your Google email and TrxID. Our verification desk reconciles the transaction and dispatches your subscription activation.',
    icon: <Send className="w-6 h-6 text-emerald-400" />,
    badge: 'Step 3 · Activation',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section-spacing relative overflow-hidden">
      <div className="container-main relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <Clock className="w-3.5 h-3.5" />
            <span>Fulfillment Protocol</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-5">
            Get Activated in 3 Frictionless Steps.
          </h2>
          <p className="text-slate-300 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
            No credit card, no USD exchange fees, no complicated setup. Just simple Bangladeshi mobile payment.
          </p>
        </div>

        {/* Steps Grid with Timeline Connectors */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto relative">
          
          {/* Subtle Timeline Track (desktop only) */}
          <div className="hidden md:block absolute top-20 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-emerald-500/30 z-0 pointer-events-none" />

          {steps.map((item, index) => (
            <div
              key={item.step}
              className="glass-card-interactive p-4 xs:p-6 sm:p-7 md:p-8 flex flex-col justify-between relative z-10 border border-white/[0.08] text-left group"
            >
              <div>
                {/* Top Badge & Time */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    {item.icon}
                  </div>
                  <span className="px-2 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-[11px] font-mono font-bold text-slate-300 bg-white/[0.05] border border-white/[0.1]">
                    ⏱️ {item.time}
                  </span>
                </div>

                {/* Step Pill */}
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-cyan-400 font-mono block mb-1.5 sm:mb-2">
                  {item.badge}
                </span>

                {/* Title */}
                <h3 className="text-lg xs:text-xl font-bold text-white mb-2 sm:mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-xs xs:text-sm text-slate-300 leading-relaxed mb-4 sm:mb-6">
                  {item.description}
                </p>
              </div>

              {/* Status footer inside step card */}
              <div className="pt-3.5 sm:pt-4 border-t border-white/[0.06] flex items-center gap-2 text-[11px] sm:text-xs text-slate-400">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Zero hassle process</span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Prompt */}
        <div className="mt-10 sm:mt-14 text-center">
          <Link
            href="/payment"
            className="btn-primary w-full sm:w-auto py-3.5 px-6 sm:px-8 text-sm font-bold inline-flex items-center justify-center gap-2 rounded-xl shadow-lg hover:shadow-indigo-500/25 active:scale-95 transition-transform"
          >
            <span>Proceed to Step 1: Claim Offer</span>
          </Link>
          <p className="text-[11px] sm:text-xs text-slate-500 mt-3 sm:mt-4 font-mono">
            Every submission is issued an immediate tracked Order Reference (e.g. ORD-XXXXXXXX).
          </p>
        </div>

      </div>
    </section>
  );
}
