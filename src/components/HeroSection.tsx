import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import LiveGemini3Animation from './LiveGemini3Animation';
import UniversityMarquee from './UniversityMarquee';

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 xs:pt-28 sm:pt-36 md:pt-40 pb-12 sm:pb-20 md:pb-24 overflow-hidden w-full max-w-[100vw]">
      {/* Dynamic Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/6 left-1/4 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[80px] sm:blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/5 w-[280px] sm:w-[600px] h-[280px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[90px] sm:blur-[160px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[200px] sm:h-[350px] bg-violet-600/10 rounded-full blur-[100px] sm:blur-[180px]" />
      </div>

      <div className="container-main relative z-10 w-full min-w-0">
        <div className="grid lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left min-w-0">
            
            {/* Scarcity / Live Batch Pill */}
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-rose-500/10 border border-rose-500/25 mb-4 sm:mb-6 backdrop-blur-md shadow-sm max-w-full">
              <span className="pulse-beacon text-rose-400 flex-shrink-0">
                <span />
                <span />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-rose-300 uppercase font-sans truncate">
                Spring 2026 Student Grant · 99% Subsidized
              </span>
              <span className="hidden xs:inline-block w-1 h-1 rounded-full bg-rose-400/50 flex-shrink-0" />
              <span className="hidden xs:inline-block text-[10px] sm:text-[11px] text-rose-200 font-semibold whitespace-nowrap">
                Only 6 Slots Remaining!
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[1.85rem] xs:text-3xl sm:text-4xl md:text-5xl xl:text-[4rem] font-extrabold leading-[1.14] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 text-white font-sans text-balance">
              Supercharge Your Degree With{' '}
              <span className="text-gradient">Gemini 3 Pro</span>{' '}
              & 5TB Storage.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal text-pretty">
              Unlock the flagship power of <strong className="text-white font-semibold">Gemini 3 Pro</strong>,{' '}
              <strong className="text-white font-semibold">5 TB Google One Cloud Storage</strong>,{' '}
              NotebookLM Plus, and Veo video studio for Bangladeshi students. Only{' '}
              <strong className="text-cyan-300 font-semibold">৳349 BDT</strong> (save approx <strong className="text-emerald-400 font-semibold">৳35,000</strong>).
            </p>

            {/* Pricing Anchor Card - Mobile First */}
            <div className="p-4 sm:p-5 rounded-2xl glass-panel border border-white/[0.1] mb-6 sm:mb-8 max-w-xl backdrop-blur-xl">
              <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-3 sm:gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                      Subsidized Student Rate
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                      Save approx ৳35,000
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="price-display text-3xl xs:text-4xl sm:text-5xl">৳349</span>
                    <span className="text-slate-400 text-xs sm:text-sm font-medium">
                      / 18-month full access
                    </span>
                  </div>
                </div>

                <div className="border-t xs:border-t-0 xs:border-l border-white/[0.08] pt-2.5 xs:pt-0 xs:pl-4">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Regular Retail</span>
                  <span className="text-slate-500 line-through text-xs sm:text-sm font-mono">৳35,349+ BDT</span>
                  <span className="text-[10px] sm:text-[11px] text-rose-400 font-semibold block mt-0.5">
                    Only 6 Slots Remaining
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-First Full-Width CTA Buttons with stable dimensions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full max-w-xl">
              <Link
                href="/payment"
                className="btn-primary w-full sm:w-auto sm:min-w-[260px] min-h-[52px] text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-indigo-500/30 font-bold group justify-center active:scale-[0.98] transition-transform box-border flex-shrink-0 text-center"
              >
                <span>Claim Your 18-Month Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Link>
              <a
                href="#benefits"
                className="btn-secondary w-full sm:w-auto sm:min-w-[170px] min-h-[52px] text-sm sm:text-base py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl group justify-center active:scale-[0.98] transition-transform box-border flex-shrink-0 text-center"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors flex-shrink-0" />
              </a>
            </div>

            {/* Trust Reassurance Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs text-slate-400 pt-3 border-t border-white/[0.06] max-w-xl">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Zero Google Password Needed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Instant bKash/Nagad/Rocket</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span>2–12 Hour Activation SLA</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Holographic Gemini 3 Pro AI Reactor */}
          <div className="lg:col-span-5 mt-6 lg:mt-0 w-full min-w-0">
            <LiveGemini3Animation />
          </div>

        </div>

        {/* Dual-Track Infinite Horizontal Marquee Carousel */}
        <UniversityMarquee />

      </div>
    </section>
  );
}
