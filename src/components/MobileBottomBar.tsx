'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles, MessageCircle, Zap } from 'lucide-react';

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide on payment, confirmation, or admin pages
  if (pathname === '/payment' || pathname?.startsWith('/order-confirmation') || pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile quick action bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/95 backdrop-blur-2xl border-t border-white/[0.1] px-4 py-2.5 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] safe-area-bottom select-none"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto w-full">
        {/* Left Price Info with tabular-nums & truncation protection */}
        <div className="flex flex-col min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold text-cyan-400 font-mono tracking-tight tabular-nums flex-shrink-0">
              ৳349
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 whitespace-nowrap flex-shrink-0">
              Save ~৳35k
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium truncate">
            18-Mo Student Pass · BDT
          </span>
        </div>

        {/* Action Buttons with strict, deterministic fixed dimensions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* WhatsApp Direct Chat icon: strictly 44px x 44px */}
          <a
            href="https://wa.me/8801704184297"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 min-w-[44px] rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 active:scale-95 transition-transform flex-shrink-0"
            aria-label="Direct WhatsApp Support"
          >
            <MessageCircle className="w-5 h-5 flex-shrink-0" />
          </a>

          {/* Primary CTA with rigid fixed width (124px) & fixed height (44px) */}
          <Link
            href="/payment"
            className="btn-primary w-[124px] min-w-[124px] h-11 py-0 px-0 text-xs font-extrabold rounded-xl shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center gap-1.5 active:scale-95 transition-transform flex-shrink-0 box-border text-center"
          >
            <span>Get Offer</span>
            <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
