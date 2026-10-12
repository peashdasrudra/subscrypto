import { ShieldCheck, Lock, Clock, Banknote, UserCheck, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

const trustPillars = [
  {
    icon: <Lock className="w-5 h-5 text-emerald-400" />,
    title: 'Zero Password Policy',
    desc: 'We NEVER ask for your Google account password, OTP, or security keys. Your credentials stay 100% private and protected.',
    tag: 'Strict Security',
  },
  {
    icon: <Banknote className="w-5 h-5 text-cyan-400" />,
    title: 'Fixed ৳349 · No Auto-Renewals',
    desc: 'One single payment covers the entire 18-month duration. No hidden monthly card debits or unexpected price hikes.',
    tag: 'Clear Pricing',
  },
  {
    icon: <Clock className="w-5 h-5 text-indigo-400" />,
    title: 'Transparent 2–12 Hour SLA',
    desc: 'Each order is reviewed directly against MFS transaction ledgers by our verification team and fulfilled via email.',
    tag: 'Tracked Delivery',
  },
  {
    icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
    title: 'Duplicate Protection',
    desc: 'Every Transaction ID is cryptographically hashed and checked to ensure fair allocation and prevent fraud.',
    tag: 'Fair Grant Allocation',
  },
  {
    icon: <MessageSquare className="w-5 h-5 text-amber-400" />,
    title: 'Human Support Desk',
    desc: 'Made a mistake in your TrxID? Our Bangladeshi support team is ready on WhatsApp and email with your Order Reference.',
    tag: 'Live Assistance',
  },
  {
    icon: <UserCheck className="w-5 h-5 text-blue-400" />,
    title: 'Personal or University Email',
    desc: 'Works with standard @gmail.com accounts or university @*.edu.bd domains with no restriction on personal Google Drive files.',
    tag: 'Universal Access',
  },
];

export default function TrustSection() {
  return (
    <section id="trust" className="section-spacing relative bg-navy-900/50 border-y border-white/[0.06]">
      <div className="container-main relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 sm:mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>Guaranteed Trust & Safety</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 sm:mb-5">
            Transparent. Secure. Student-First.
          </h2>
          <p className="text-slate-300 text-xs xs:text-sm sm:text-base md:text-lg leading-relaxed">
            We operate with absolute transparency so you can focus completely on your research and coursework.
          </p>
        </div>

        {/* 6-Pillar Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
          {trustPillars.map((item) => (
            <div
              key={item.title}
              className="glass-panel p-4 xs:p-6 md:p-7 border border-white/[0.08] hover:border-white/[0.16] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5 sm:mb-4">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.06]">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-sm xs:text-base font-bold text-white mb-1.5 sm:mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Refund Policy & Clarification Callout */}
        <div className="mt-8 sm:mt-12 max-w-4xl mx-auto glass-panel p-4 sm:p-5 rounded-2xl border border-amber-500/20 bg-amber-950/10 flex items-start gap-3 sm:gap-3.5">
          <AlertCircle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            <strong className="text-amber-300 font-semibold block mb-0.5">
              Fulfillment Verification & Refund Notice:
            </strong>
            If your transaction cannot be verified within our standard SLA window or if the student allocation pool is depleted, our support team will contact you directly for immediate re-verification or a full 100% refund.
          </div>
        </div>

      </div>
    </section>
  );
}
