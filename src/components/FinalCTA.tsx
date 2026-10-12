import Link from 'next/link';
import { ArrowRight, ShieldCheck, Zap, MessageCircle, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="section-spacing relative overflow-hidden">
      <div className="container-main relative z-10">
        
        {/* Glow backdrop behind CTA box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[650px] h-[220px] sm:h-[350px] bg-gradient-to-r from-indigo-600/25 via-cyan-500/20 to-violet-600/25 rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />

        {/* Main Banner Card */}
        <div className="relative rounded-2xl sm:rounded-3xl glass-panel-elevated p-4 xs:p-6 sm:p-10 md:p-16 text-center border border-white/[0.14] overflow-hidden max-w-4xl mx-auto shadow-2xl">
          
          {/* Top Live Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-5 sm:mb-6">
            <span className="pulse-beacon text-rose-400 flex-shrink-0">
              <span />
              <span />
            </span>
            <span>Only 6 Slots Remaining · Spring 2026 Student Grant</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4 sm:mb-6 max-w-2xl mx-auto leading-[1.15]">
            Don&apos;t Spend Another Semester Working in Slow Motion.
          </h2>

          {/* Subtext */}
          <p className="text-xs sm:text-base md:text-lg text-slate-300 max-w-xl mx-auto mb-6 sm:mb-8 leading-relaxed">
            Equip yourself with Gemini 3 Pro, 5 TB Google One Cloud Storage, NotebookLM Plus, and Veo video studio before allocation quotas close.
          </p>

          {/* Price Tag Hero */}
          <div className="inline-flex flex-col items-center mb-6 sm:mb-8 p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] w-full max-w-xs">
            <div className="flex items-baseline gap-2">
              <span className="price-display text-3xl sm:text-5xl">৳349</span>
              <span className="text-slate-400 text-xs sm:text-sm font-semibold">/ 18-month pass</span>
            </div>
            <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 mt-1 font-bold">
              Normally ৳35,349+ · Save approx ৳35,000
            </span>
          </div>

          {/* Action Row - Mobile Stacking with fixed, predictable bounds */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-xl mx-auto">
            <Link
              href="/payment"
              className="btn-primary w-full sm:w-auto sm:min-w-[250px] min-h-[52px] text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-indigo-500/30 font-bold group justify-center active:scale-[0.98] box-border text-center flex-shrink-0"
            >
              <span>Get Your 18-Month Pass</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </Link>

            <a
              href="https://wa.me/8801704184297"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto sm:min-w-[200px] min-h-[52px] text-xs sm:text-base py-3.5 sm:py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform box-border text-center flex-shrink-0"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Ask on WhatsApp</span>
            </a>
          </div>

          {/* Bottom Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-400 pt-5 sm:pt-6 border-t border-white/[0.08]">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              Zero Google Password Needed
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              bKash / Nagad / Rocket
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0" />
              Delivered within 2–12 Hours
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
