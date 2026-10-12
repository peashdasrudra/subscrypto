import Link from 'next/link';
import { Sparkles, MessageCircle, Mail, ShieldCheck } from 'lucide-react';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-navy-950/80 pt-16 pb-12 relative overflow-hidden">
      
      {/* Subtle bottom ambient line */}
      <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="container-main">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/[0.06]">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 p-0.5 shadow-md">
                <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </div>
              <span className="font-extrabold text-white text-base tracking-tight font-sans">
                Google AI Pro <span className="text-slate-400 font-normal">Student BD</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mb-6">
              Independent student technology facilitator providing subsidized Google AI Pro academic passes (18 Months for ৳349 BDT) for university scholars in Bangladesh.
            </p>

            {/* Live Operational Status */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Verification Desks Operational (24/7)</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Academic Suite
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#benefits" className="hover:text-cyan-400 transition-colors">
                  Gemini 3 Pro Neural Core
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-cyan-400 transition-colors">
                  NotebookLM Plus
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-cyan-400 transition-colors">
                  Veo & Imagen 3 Studios
                </a>
              </li>
              <li>
                <a href="#benefits" className="hover:text-cyan-400 transition-colors">
                  5 TB Google One Cloud
                </a>
              </li>
              <li>
                <a href="#use-cases" className="hover:text-cyan-400 transition-colors">
                  Student Department Workflows
                </a>
              </li>
            </ul>
          </div>

          {/* Verification & Trust */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Support & SLA
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#how-it-works" className="hover:text-cyan-400 transition-colors">
                  How Fulfillment Works
                </a>
              </li>
              <li>
                <a href="#trust" className="hover:text-cyan-400 transition-colors">
                  Zero-Password Policy
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <Link href="/payment" className="hover:text-cyan-400 transition-colors">
                  Track Existing Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Support & Contact */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-mono">
              Direct Contact
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/8801704184297"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-semibold text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp: 01704184297</span>
              </a>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-slate-300">
                <Mail className="w-4 h-4 flex-shrink-0 text-cyan-400" />
                <span>support@subscrypto.com</span>
              </div>
            </div>

            {/* MFS Accepted Badges */}
            <div className="mt-5">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider block mb-2 font-mono">
                Accepted MFS Providers
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#E2136E]/15 border border-[#E2136E]/30 text-[#E2136E] text-[10px] font-bold">
                  bKash
                </span>
                <span className="px-2.5 py-1 rounded bg-[#F6921E]/15 border border-[#F6921E]/30 text-[#F6921E] text-[10px] font-bold">
                  Nagad
                </span>
                <span className="px-2.5 py-1 rounded bg-[#8C338C]/15 border border-[#8C338C]/30 text-[#D88FD8] text-[10px] font-bold">
                  Rocket
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal Notice */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © 2026 SubsCrypto Student AI Desk. Independently operated service in Dhaka, Bangladesh.
          </p>
          <div className="flex items-center gap-4 text-center md:text-right">
            <p className="max-w-md">
              Not affiliated with, endorsed by, or operated by Google LLC. Google AI Pro, Gemini, and Google One are trademarks of Google LLC.
            </p>
            <Link
              href="/admin"
              className="text-slate-600 hover:text-slate-400 font-mono text-[11px] transition-colors whitespace-nowrap"
            >
              Admin Desk
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
