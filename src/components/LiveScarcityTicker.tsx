'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, ArrowRight, ShieldCheck, CheckCircle2, Clock, X, Zap } from 'lucide-react';

interface ClaimEvent {
  name: string;
  institution: string;
  action: string;
  timeAgo: string;
  avatarColor: string;
}

const recentClaims: ClaimEvent[] = [
  {
    name: 'Samiul H.',
    institution: 'BUET (CSE)',
    action: 'Secured Gemini 3 Pro + 5TB Storage Pass',
    timeAgo: 'Just now',
    avatarColor: 'from-blue-600 to-indigo-600',
  },
  {
    name: 'Nafisa R.',
    institution: 'Dhaka University',
    action: 'Claimed slot #94 — Saved ৳35,000',
    timeAgo: '2m ago',
    avatarColor: 'from-emerald-600 to-teal-600',
  },
  {
    name: 'Arif K.',
    institution: 'NSU',
    action: 'Activated 18-Month 5TB Cloud Pass',
    timeAgo: '4m ago',
    avatarColor: 'from-purple-600 to-pink-600',
  },
  {
    name: 'Tasnim A.',
    institution: 'BRACU',
    action: 'Claimed slot #93 at ৳349 BDT',
    timeAgo: '7m ago',
    avatarColor: 'from-amber-600 to-orange-600',
  },
  {
    name: 'Farhan M.',
    institution: 'IUT',
    action: 'Secured Gemini 3 Pro Academic Tier',
    timeAgo: '11m ago',
    avatarColor: 'from-cyan-600 to-blue-600',
  },
];

export default function LiveScarcityTicker() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');
  const isCheckoutPage = pathname === '/payment' || pathname?.startsWith('/order-confirmation') || isAdminPage;

  const [currentClaimIndex, setCurrentClaimIndex] = useState(0);
  const [isToastVisible, setIsToastVisible] = useState(true);
  const [toastDismissed, setToastDismissed] = useState(false);

  // Rotate through recent claims every 6 seconds
  useEffect(() => {
    if (toastDismissed || isAdminPage) return;

    const interval = setInterval(() => {
      setIsToastVisible(false);
      setTimeout(() => {
        setCurrentClaimIndex((prev) => (prev + 1) % recentClaims.length);
        setIsToastVisible(true);
      }, 400);
    }, 6000);

    return () => clearInterval(interval);
  }, [toastDismissed, isAdminPage]);

  if (isAdminPage) return null;

  const currentClaim = recentClaims[currentClaimIndex];

  return (
    <>
      {/* ====================================================================
          1. Top Urgent Sticky Announcement Banner
          ==================================================================== */}
      <div className="relative z-50 bg-gradient-to-r from-rose-950/95 via-navy-950 to-indigo-950/95 border-b border-rose-500/30 backdrop-blur-xl px-2.5 sm:px-3 py-1.5 sm:py-2 text-center text-xs overflow-hidden select-none">
        {/* Animated laser accent */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent animate-laser-sweep" />
        </div>

        <div className="container-main w-full">
          {/* Mobile Layout (< 640px): Ultra-compact 1-line stream */}
          <div className="flex sm:hidden items-center justify-between gap-1.5 text-[10.5px]">
            <span className="inline-flex items-center gap-1 font-bold font-mono text-rose-300 whitespace-nowrap">
              <Flame className="w-3 h-3 fill-current text-rose-400 animate-pulse flex-shrink-0" />
              <span>6 Left</span>
            </span>

            <span className="text-slate-200 truncate mx-1">
              Gemini 3 Pro <strong className="text-cyan-300 font-mono">৳349</strong>{' '}
              <span className="text-emerald-400 font-mono font-bold">(Save ৳35k)</span>
            </span>

            <Link
              href="/payment"
              className="inline-flex items-center justify-end gap-0.5 font-bold text-cyan-300 hover:text-white underline underline-offset-2 flex-shrink-0 whitespace-nowrap min-w-[58px]"
            >
              <span>Lock In</span>
              <ArrowRight className="w-2.5 h-2.5 flex-shrink-0" />
            </Link>
          </div>

          {/* Tablet & Desktop Layout (>= 640px) */}
          <div className="hidden sm:flex items-center justify-center gap-2 sm:gap-3 text-slate-200">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 font-bold font-mono text-[10px] uppercase border border-rose-500/40 animate-pulse flex-shrink-0">
              <Flame className="w-3 h-3 fill-current text-rose-400" />
              Limited Allocation
            </span>

            <span className="text-[11px] sm:text-xs">
              <strong className="text-white">Only 6 Slots Remaining</strong> in 100-Seat Batch ·{' '}
              <span className="text-rose-300 font-semibold">Gemini 3 Pro & 5 TB Storage</span> for{' '}
              <strong className="text-cyan-300 font-mono">৳349 BDT</strong>{' '}
              <span className="text-emerald-400 font-mono font-bold">(Save approx ৳35,000)</span>
            </span>

            <Link
              href="/payment"
              className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-cyan-300 hover:text-white underline underline-offset-4 decoration-cyan-400/50 hover:decoration-white transition-all cursor-pointer ml-1 flex-shrink-0"
            >
              <span>Lock In Your Slot</span>
              <ArrowRight className="w-3 h-3 flex-shrink-0" />
            </Link>
          </div>
        </div>
      </div>

      {/* ====================================================================
          2. Floating Live Activity Toast Notification (Bottom Left)
          Mobile-safe: Anchored above mobile bottom bar, left-3 right-3, strictly constrained
          ==================================================================== */}
      {!toastDismissed && !isCheckoutPage && (
        <aside
          aria-label="Live claim notification"
          className={`fixed bottom-[74px] sm:bottom-6 left-3 right-3 sm:right-auto sm:left-4 z-40 sm:w-[360px] sm:max-w-sm transition-all duration-500 ${
            isToastVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-3 scale-95 pointer-events-none'
          }`}
        >
          <div className="relative p-3 sm:p-4 rounded-xl sm:rounded-2xl glass-panel-elevated border border-white/[0.14] shadow-2xl shadow-black/80 bg-navy-950/95 backdrop-blur-2xl">
            {/* Ambient Corner Glow */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start gap-2.5 sm:gap-3">
              {/* Avatar Pill */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr ${currentClaim.avatarColor} p-0.5 shadow-md flex-shrink-0 flex items-center justify-center text-white font-bold text-xs`}
              >
                {currentClaim.name.charAt(0)}
              </div>

              {/* Claim Body */}
              <div className="flex-1 min-w-0 pr-2">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-xs font-bold text-white truncate">
                    {currentClaim.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium truncate">
                    · {currentClaim.institution}
                  </span>
                </div>

                <p className="text-[10.5px] sm:text-[11px] text-slate-300 leading-snug truncate">
                  {currentClaim.action}
                </p>

                <div className="flex items-center gap-1.5 sm:gap-2 mt-1 text-[9.5px] sm:text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-3 h-3 flex-shrink-0" />
                    Verified
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-2.5 h-2.5 flex-shrink-0" />
                    {currentClaim.timeAgo}
                  </span>
                  <span>·</span>
                  <span className="text-rose-400 font-bold">Only 6 Left</span>
                </div>
              </div>

              {/* Close / Dismiss */}
              <button
                onClick={() => setToastDismissed(true)}
                className="text-slate-500 hover:text-slate-300 p-1 -mr-1 -mt-1 rounded-lg transition-colors cursor-pointer flex-shrink-0"
                aria-label="Dismiss notification"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
