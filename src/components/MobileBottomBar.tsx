'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles, MessageCircle, Zap } from 'lucide-react';

export default function MobileBottomBar() {
  const pathname = usePathname();

  // Hide on payment or confirmation pages if redundant
  if (pathname === '/payment' || pathname?.startsWith('/order-confirmation')) {
    return null;
  }

  return (
    <aside
      aria-label="Mobile quick action bar"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-950/90 backdrop-blur-2xl border-t border-white/[0.1] px-4 py-3 shadow-[0_-10px_30px_rgba(0,0,0,0.6)] safe-area-bottom"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* Left Price Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold text-cyan-400 font-mono tracking-tight">
              ৳349
            </span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              Save ~৳35k
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-medium">
            18-Mo Student Pass · BDT
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* WhatsApp Direct Chat icon */}
          <a
            href="https://wa.me/8801533679773"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 active:scale-95 transition-transform"
            aria-label="Direct WhatsApp Support"
          >
            <MessageCircle className="w-5 h-5" />
          </a>

          {/* Primary CTA */}
          <Link
            href="/payment"
            className="btn-primary py-3 px-5 text-xs font-extrabold rounded-xl shadow-lg hover:shadow-indigo-500/30 flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>Get Offer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
