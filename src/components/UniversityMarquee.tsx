'use client';

import { Sparkles, CheckCircle2, GraduationCap, ShieldCheck } from 'lucide-react';

interface University {
  shortName: string;
  fullName: string;
  specialty: string;
  crestGradient: string;
  activePasses: string;
}

const row1Universities: University[] = [
  {
    shortName: 'BUET',
    fullName: 'Bangladesh Univ of Engineering & Tech',
    specialty: 'Premier Engineering & CS',
    crestGradient: 'from-rose-600 via-red-600 to-amber-600',
    activePasses: '194 Enrolled',
  },
  {
    shortName: 'Dhaka University',
    fullName: 'University of Dhaka (DU)',
    specialty: 'Research & Faculty of Science',
    crestGradient: 'from-emerald-600 via-teal-600 to-cyan-600',
    activePasses: '218 Enrolled',
  },
  {
    shortName: 'NSU',
    fullName: 'North South University',
    specialty: 'School of Engineering & Physical Sci',
    crestGradient: 'from-blue-600 via-indigo-600 to-violet-600',
    activePasses: '162 Enrolled',
  },
  {
    shortName: 'BRACU',
    fullName: 'BRAC University',
    specialty: 'Computer Science & AI Lab',
    crestGradient: 'from-amber-600 via-orange-600 to-rose-600',
    activePasses: '147 Enrolled',
  },
  {
    shortName: 'IUT',
    fullName: 'Islamic University of Technology',
    specialty: 'OIC Engineering & Technology',
    crestGradient: 'from-cyan-600 via-teal-600 to-emerald-600',
    activePasses: '108 Enrolled',
  },
  {
    shortName: 'SUST',
    fullName: 'Shahjalal Univ of Sci & Technology',
    specialty: 'Software & Applied Sciences',
    crestGradient: 'from-violet-600 via-purple-600 to-indigo-600',
    activePasses: '124 Enrolled',
  },
  {
    shortName: 'CUET',
    fullName: 'Chittagong Univ of Eng & Tech',
    specialty: 'Civil, Mechanical & EEE',
    crestGradient: 'from-pink-600 via-rose-600 to-red-600',
    activePasses: '89 Enrolled',
  },
];

const row2Universities: University[] = [
  {
    shortName: 'RUET',
    fullName: 'Rajshahi Univ of Eng & Tech',
    specialty: 'Computer Science & Architecture',
    crestGradient: 'from-indigo-600 via-blue-600 to-cyan-600',
    activePasses: '96 Enrolled',
  },
  {
    shortName: 'KUET',
    fullName: 'Khulna Univ of Eng & Tech',
    specialty: 'Robotics & Biomedical Engineering',
    crestGradient: 'from-teal-600 via-emerald-600 to-lime-600',
    activePasses: '82 Enrolled',
  },
  {
    shortName: 'AIUB',
    fullName: 'American International University-BD',
    specialty: 'Faculty of Science & Technology',
    crestGradient: 'from-blue-600 via-cyan-600 to-teal-600',
    activePasses: '115 Enrolled',
  },
  {
    shortName: 'JU',
    fullName: 'Jahangirnagar University',
    specialty: 'Mathematical & Physical Sciences',
    crestGradient: 'from-amber-600 via-yellow-600 to-emerald-600',
    activePasses: '78 Enrolled',
  },
  {
    shortName: 'BUTEX',
    fullName: 'Bangladesh Univ of Textiles',
    specialty: 'Textile Engineering & Materials',
    crestGradient: 'from-purple-600 via-pink-600 to-rose-600',
    activePasses: '64 Enrolled',
  },
  {
    shortName: 'AUST',
    fullName: 'Ahsanullah Univ of Science & Tech',
    specialty: 'Engineering & Innovation',
    crestGradient: 'from-cyan-600 via-sky-600 to-blue-600',
    activePasses: '91 Enrolled',
  },
  {
    shortName: 'EWU',
    fullName: 'East West University',
    specialty: 'Computer Science & Engineering',
    crestGradient: 'from-orange-600 via-amber-600 to-yellow-600',
    activePasses: '73 Enrolled',
  },
];

function UniversityCard({ uni }: { uni: University }) {
  // Extract a 2-4 character monogram
  const monogram = uni.shortName.length <= 4 
    ? uni.shortName 
    : uni.shortName.split(' ').map(w => w[0]).join('').slice(0, 3);

  return (
    <div className="group/card relative flex items-center gap-2.5 sm:gap-3.5 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-navy-950/80 hover:bg-navy-900/95 border border-white/[0.08] hover:border-cyan-500/40 backdrop-blur-xl shadow-md hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 hover:scale-[1.02] cursor-default flex-shrink-0 select-none">
      {/* Specular Top Shimmer Edge */}
      <div className="absolute top-0 inset-x-3 sm:inset-x-4 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover/card:via-cyan-400/60 transition-colors" />

      {/* Monogram Crest Emblem */}
      <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-br ${uni.crestGradient} p-0.5 shadow-sm flex-shrink-0 flex items-center justify-center`}>
        <div className="w-full h-full bg-navy-950/90 rounded-[7px] sm:rounded-[10px] flex items-center justify-center">
          <span className="font-extrabold text-[9.5px] sm:text-xs text-white tracking-wider font-mono">
            {monogram}
          </span>
        </div>
      </div>

      {/* University Identity */}
      <div className="flex flex-col min-w-0 pr-1">
        <div className="flex items-center gap-1.5">
          <span className="text-xs sm:text-sm font-extrabold text-white group-hover/card:text-cyan-300 transition-colors whitespace-nowrap">
            {uni.shortName}
          </span>
          <CheckCircle2 className="w-3 h-3 text-cyan-400 flex-shrink-0 opacity-80" />
        </div>
        <span className="text-[9.5px] sm:text-[10.5px] text-slate-400 font-medium whitespace-nowrap max-w-[130px] xs:max-w-[170px] sm:max-w-[230px] truncate">
          {uni.fullName}
        </span>
      </div>

      {/* Active Grant Status Chip */}
      <div className="ml-1 pl-2 border-l border-white/[0.06] flex flex-col items-end flex-shrink-0">
        <span className="inline-flex items-center gap-1 text-[8.5px] sm:text-[9.5px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-1.5 sm:px-2 py-0.5 rounded-full border border-emerald-500/20 whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Verified
        </span>
        <span className="text-[8.5px] sm:text-[9px] font-mono text-slate-400 mt-0.5 whitespace-nowrap">
          {uni.activePasses}
        </span>
      </div>
    </div>
  );
}

export default function UniversityMarquee() {
  // Seamless loop duplicates
  const row1List = [...row1Universities, ...row1Universities];
  const row2List = [...row2Universities, ...row2Universities];

  return (
    <div className="mt-12 sm:mt-20 pt-8 sm:pt-12 border-t border-white/[0.08] relative -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 overflow-hidden w-full max-w-[100vw]">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[200px] sm:h-[250px] bg-gradient-to-r from-indigo-600/10 via-cyan-500/10 to-violet-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-5 sm:mb-8 px-3 relative z-10">
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[9.5px] sm:text-[11px] font-mono font-bold uppercase tracking-widest mb-2.5 sm:mb-3 backdrop-blur-md">
          <GraduationCap className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span>Academic Grant Network · Bangladesh</span>
        </div>

        <h3 className="text-sm xs:text-base sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-snug">
          Empowering Scholars Across Leading Universities
        </h3>
        <p className="text-[11px] sm:text-sm text-slate-400 mt-1 font-normal max-w-lg mx-auto">
          Over <strong className="text-white font-semibold">850+ students</strong> across premier engineering & research institutions actively rely on our subsidized pass.
        </p>
      </div>

      {/* Infinite Horizontal Carousel Container with Luxury Gradient Edge Masks */}
      <div className="relative w-full marquee-mask overflow-hidden py-1 sm:py-2 select-none group/marquee">
        
        {/* Left & Right Edge Vignette Gradients for True Edge Dissolve (Mobile responsive width) */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 xs:w-14 sm:w-24 md:w-32 bg-gradient-to-r from-navy-950 via-navy-950/85 to-transparent z-20" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 xs:w-14 sm:w-24 md:w-32 bg-gradient-to-l from-navy-950 via-navy-950/85 to-transparent z-20" />

        {/* Row 1: Forward Marquee */}
        <div className="animate-marquee-forward flex items-center gap-2.5 sm:gap-4 py-1">
          {row1List.map((uni, idx) => (
            <UniversityCard key={`row1-${uni.shortName}-${idx}`} uni={uni} />
          ))}
        </div>

        {/* Row 2: Reverse Marquee */}
        <div className="animate-marquee-reverse flex items-center gap-2.5 sm:gap-4 py-1 mt-1.5 sm:mt-2">
          {row2List.map((uni, idx) => (
            <UniversityCard key={`row2-${uni.shortName}-${idx}`} uni={uni} />
          ))}
        </div>
      </div>

      {/* Bottom Sub-Caption Trust Marker */}
      <div className="mt-4 sm:mt-5 text-center flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[9.5px] sm:text-[11px] font-mono text-slate-400 relative z-10 px-2">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
        <span>Subsidized university passes activated via official student credentials</span>
        <span className="hidden sm:inline">·</span>
        <span className="hidden sm:inline text-cyan-300 font-semibold">Hover any campus to pause</span>
      </div>
    </div>
  );
}
