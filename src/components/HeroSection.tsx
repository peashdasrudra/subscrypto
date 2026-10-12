import Link from 'next/link';
import { ArrowRight, ShieldCheck, Clock, CheckCircle2, Sparkles, Cpu, BookOpen, HardDrive, Zap, ChevronRight } from 'lucide-react';

const universities = [
  'BUET', 'Dhaka University', 'NSU', 'BRACU', 'IUT', 'SUST', 'CUET', 'RUET', 'AIUB', 'JU'
];

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-14 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24 overflow-hidden">
      {/* Dynamic Ambient Background Lighting */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/6 left-1/4 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-indigo-600/15 rounded-full blur-[100px] sm:blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/5 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-cyan-500/10 rounded-full blur-[110px] sm:blur-[160px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] sm:w-[700px] h-[250px] sm:h-[350px] bg-violet-600/10 rounded-full blur-[120px] sm:blur-[180px]" />
      </div>

      <div className="container-main relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 text-left">
            
            {/* Scarcity / Live Batch Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 mb-5 sm:mb-6 backdrop-blur-md shadow-sm max-w-full">
              <span className="pulse-beacon text-indigo-400 flex-shrink-0">
                <span />
                <span />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-indigo-300 uppercase font-sans truncate">
                Spring 2026 Student Grant · 90% Subsidized
              </span>
              <span className="hidden xs:inline-block w-1 h-1 rounded-full bg-indigo-400/50 flex-shrink-0" />
              <span className="hidden xs:inline-block text-[10px] sm:text-[11px] text-indigo-200/80 font-medium whitespace-nowrap">
                Limited Slots
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl xl:text-[4.25rem] font-extrabold leading-[1.12] sm:leading-[1.08] tracking-tight mb-5 sm:mb-6 text-white font-sans text-balance">
              Supercharge Your Degree With{' '}
              <span className="text-gradient">18 Months</span>{' '}
              of Google AI Pro.
            </h1>

            {/* Sub-headline */}
            <p className="text-sm xs:text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal text-pretty">
              Access the full suite of <strong className="text-white font-semibold">Gemini 1.5 Pro (2M Context)</strong>,{' '}
              <strong className="text-white font-semibold">NotebookLM Research</strong>, Veo video creation, and{' '}
              <strong className="text-white font-semibold">2TB Cloud Storage</strong> for Bangladeshi students at an unbeatable student rate.
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
                      Save ৳3,251
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
                  <span className="text-slate-500 line-through text-xs sm:text-sm font-mono">৳3,600+ BDT</span>
                  <span className="text-[10px] sm:text-[11px] text-cyan-400 font-semibold block mt-0.5">
                    1-Time Payment · No Recurring Bills
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-First Full-Width CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Link
                href="/payment"
                className="btn-primary w-full sm:w-auto text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl hover:shadow-indigo-500/30 font-bold group justify-center active:scale-[0.98] transition-transform"
              >
                <span>Claim Your 18-Month Pass</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#benefits"
                className="btn-secondary w-full sm:w-auto text-sm sm:text-base py-3.5 sm:py-4 px-5 sm:px-6 rounded-xl group justify-center active:scale-[0.98] transition-transform"
              >
                <span>Explore Features</span>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
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
                <span>12-Hour Activation SLA</span>
              </div>
            </div>
          </div>

          {/* Visual Dashboard Mockup - Visible on BOTH mobile and desktop! */}
          <div className="lg:col-span-5 mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer Decorative Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-violet-500/20 blur-xl opacity-70 animate-pulse-glow" />

              {/* Main Luxury Glass Card */}
              <div className="relative rounded-2xl sm:rounded-3xl glass-panel-elevated p-5 sm:p-7 md:p-8 border border-white/[0.12] overflow-hidden">
                
                {/* Header of Simulated Workspace */}
                <div className="flex items-center justify-between pb-4 sm:pb-5 border-b border-white/[0.08] mb-5">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 p-0.5 shadow-md flex-shrink-0">
                      <div className="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center">
                        <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        Google AI Pro Suite
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-slate-400 font-mono">Academic Tier · Bangladesh</p>
                    </div>
                  </div>
                  <span className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 whitespace-nowrap">
                    18 Months Active
                  </span>
                </div>

                {/* Simulated Feature Stack */}
                <div className="space-y-3 mb-5">
                  
                  {/* Feature 1: Gemini 1.5 Pro */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-white">Gemini 1.5 Pro</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-indigo-300 px-1.5 py-0.5 rounded bg-indigo-500/15">
                        2,000,000 Tokens
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-snug">
                      Analyze entire textbooks, full codebase repositories, and lecture video in a single inquiry.
                    </p>
                  </div>

                  {/* Feature 2: NotebookLM Pro */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-white">NotebookLM Plus</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-cyan-300 px-1.5 py-0.5 rounded bg-cyan-500/15">
                        Audio Podcasts
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-slate-400 leading-snug">
                      Turn research PDFs into dynamic podcast conversations with clickable citations.
                    </p>
                  </div>

                  {/* Feature 3: 2TB Cloud Storage */}
                  <div className="p-3 sm:p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-violet-400 flex-shrink-0" />
                        <span className="text-xs font-bold text-white">2TB Google One Cloud</span>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-violet-300 px-1.5 py-0.5 rounded bg-violet-500/15">
                        2,048 GB Total
                      </span>
                    </div>
                    <div className="w-full bg-navy-800 rounded-full h-1.5 mb-1 overflow-hidden">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 h-1.5 rounded-full w-3/4" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] text-slate-400">Ample room for all datasets, simulations, and backups</span>
                  </div>
                </div>

                {/* Footer Live Social Proof Ticker */}
                <div className="pt-3.5 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-600 border border-navy-950 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white">B</div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-600 border border-navy-950 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white">D</div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-purple-600 border border-navy-950 flex items-center justify-center text-[8px] sm:text-[9px] font-bold text-white">N</div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-slate-300 font-medium">
                      <strong className="text-white">850+</strong> students enrolled
                    </span>
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Available Now
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* University Logos / Badges Marquee - Mobile Scrollable or Clean Wrap */}
        <div className="mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/[0.08] text-center">
          <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4 sm:mb-6 font-mono">
            Empowering students from leading Bangladeshi universities
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-5">
            {universities.map((uni) => (
              <span
                key={uni}
                className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[11px] sm:text-xs font-bold text-slate-300 hover:text-white transition-all cursor-default"
              >
                {uni}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
