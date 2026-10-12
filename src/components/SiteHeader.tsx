'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sparkles, ArrowRight, ShieldCheck, Zap, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Academic Suite', href: '#benefits' },
  { label: 'Student Majors', href: '#use-cases' },
  { label: '3-Step Activation', href: '#how-it-works' },
  { label: 'Trust & Safety', href: '#trust' },
  { label: 'FAQ', href: '#faq' },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is active
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 safe-area-top ${
        scrolled
          ? 'py-2.5 sm:py-3 bg-navy-950/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'py-3.5 sm:py-5 bg-navy-950/40 backdrop-blur-md lg:bg-transparent'
      }`}
    >
      <div className="container-main flex items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="SubsCrypto Home">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-500 p-0.5 shadow-[0_0_20px_rgba(99,102,241,0.5)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.8)] transition-all duration-300 flex-shrink-0">
            <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white text-sm sm:text-base tracking-tight font-sans">
                Google AI Pro
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-wider uppercase px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                BD
              </span>
            </div>
            <span className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-normal -mt-0.5 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
              18-Month Student Pass
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md px-4 shadow-inner" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white px-3.5 py-1.5 rounded-full hover:bg-white/[0.06] transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Desktop CTAs */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>৳349 / 18 Months</span>
          </div>
          <Link
            href="/payment"
            className="btn-primary py-2.5 px-5 text-xs font-bold rounded-xl shadow-lg hover:shadow-indigo-500/25 flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>Claim Student Pass</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Menu Trigger (Generous 44px tap target) */}
        <button
          className="lg:hidden w-11 h-11 flex items-center justify-center rounded-xl bg-white/[0.05] border border-white/[0.1] text-slate-300 hover:text-white active:scale-95 transition-all cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-navy-950/95 backdrop-blur-3xl z-50 flex flex-col justify-between p-6 overflow-y-auto animate-fade-in border-t border-white/[0.08]">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] mb-3">
              <span className="text-xs text-slate-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Student Subsidy
              </span>
              <span className="text-xs font-bold text-cyan-400 font-mono">৳349 BDT</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-3.5 px-4 text-base font-semibold text-slate-200 hover:text-white hover:bg-white/[0.06] rounded-xl transition-colors flex items-center justify-between"
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.08] space-y-3 pb-6">
            <Link
              href="/payment"
              className="btn-primary w-full py-4 text-sm font-bold justify-center rounded-xl shadow-xl flex items-center gap-2 active:scale-95 transition-transform"
              onClick={() => setMobileOpen(false)}
            >
              <span>Claim Student Pass (৳349)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="https://wa.me/8801533679773"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full py-3.5 text-xs font-semibold justify-center rounded-xl flex items-center gap-2 text-emerald-400"
              onClick={() => setMobileOpen(false)}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask on WhatsApp (+880 1533-679773)</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
