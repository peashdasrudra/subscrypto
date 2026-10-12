import { Sparkles, Video, Image as ImageIcon, BookOpen, Cloud, LayoutGrid, Check, ArrowUpRight, Cpu } from 'lucide-react';

interface BentoFeature {
  title: string;
  tagline: string;
  description: string;
  metric: string;
  icon: React.ReactNode;
  gradient: string;
  borderGlow: string;
  colSpan: string;
  bullets: string[];
}

const bentoFeatures: BentoFeature[] = [
  {
    title: 'Gemini 1.5 Pro (Next-Gen)',
    tagline: 'Massive 2,000,000 Token Context Window',
    description: 'Process whole textbooks, 50,000 lines of code, or hours of audio and video in a single inquiry without memory loss or hallucinated context.',
    metric: '2M Tokens',
    icon: <Cpu className="w-6 h-6 text-cyan-400" />,
    gradient: 'from-cyan-500/10 via-indigo-500/5 to-transparent',
    borderGlow: 'hover:border-cyan-500/40',
    colSpan: 'lg:col-span-8',
    bullets: [
      'Ingest 1,500+ page academic PDFs instantly',
      'Advanced Python, C++, and MATLAB code generation & debugging',
      'Native multimodal vision for chart and diagram breakdown',
    ],
  },
  {
    title: 'NotebookLM Plus',
    tagline: 'Source-Grounded AI Research Partner',
    description: 'Transform your research repository into dynamic Audio Overviews (AI podcasts) and generate citations verified directly from your study sources.',
    metric: 'Zero Hallucination',
    icon: <BookOpen className="w-6 h-6 text-indigo-400" />,
    gradient: 'from-indigo-500/10 via-violet-500/5 to-transparent',
    borderGlow: 'hover:border-indigo-500/40',
    colSpan: 'lg:col-span-4',
    bullets: [
      'Dual-host audio discussions explaining difficult topics',
      'Instant study guides, FAQ sheets, and briefing docs',
      'Clickable citations mapped back to your source pages',
    ],
  },
  {
    title: 'Veo AI Video Generator',
    tagline: 'Cinematic 1080p Visual Presentations',
    description: 'Create high-definition videos from text prompts for semester projects, capstone defense visuals, and creative storytelling.',
    metric: 'Full HD & 4K',
    icon: <Video className="w-6 h-6 text-pink-400" />,
    gradient: 'from-pink-500/10 via-rose-500/5 to-transparent',
    borderGlow: 'hover:border-pink-500/40',
    colSpan: 'lg:col-span-4',
    bullets: [
      'Consistent physics and camera motion controls',
      'Tailored for university presentation storytelling',
    ],
  },
  {
    title: 'Imagen 3 Visual Engine',
    tagline: 'Photorealistic Imagery & Diagram Assets',
    description: 'Generate publication-grade illustrations, architectural concepts, and presentation diagrams with extraordinary typography handling.',
    metric: 'Ultra-High Res',
    icon: <ImageIcon className="w-6 h-6 text-amber-400" />,
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
    borderGlow: 'hover:border-amber-500/40',
    colSpan: 'lg:col-span-4',
    bullets: [
      'Crisp in-image text rendering and mathematical symbols',
      'Wide aspect ratios for PowerPoint and LaTeX slides',
    ],
  },
  {
    title: '2TB Google One Storage',
    tagline: 'Massive Cloud Reserve for Academic Assets',
    description: 'Never worry about full storage alerts. Keep all research datasets, machine learning models, project assets, and system backups organized.',
    metric: '2,048 GB Cloud',
    icon: <Cloud className="w-6 h-6 text-emerald-400" />,
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
    borderGlow: 'hover:border-emerald-500/40',
    colSpan: 'lg:col-span-4',
    bullets: [
      'Unified across Google Drive, Gmail, and Google Photos',
      'Collaborative sharing for student project teams',
    ],
  },
];

export default function BenefitsGrid() {
  return (
    <section id="benefits" className="section-spacing relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-900/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container-main relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Complete Academic Ecosystem</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Everything You Need to Dominate Your Semester.
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Replace dozens of disparate tools with one state-of-the-art AI suite tailored for university research, coding, writing, and storage.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6">
          {bentoFeatures.map((feat) => (
            <div
              key={feat.title}
              className={`${feat.colSpan} glass-card-interactive p-5 sm:p-7 md:p-8 flex flex-col justify-between group relative overflow-hidden border border-white/[0.08] ${feat.borderGlow}`}
            >
              {/* Dynamic Inner Gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Header row: Icon + Metric Tag */}
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                    {feat.icon}
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold font-mono text-white bg-white/[0.06] border border-white/[0.1] shadow-inner">
                    {feat.metric}
                  </span>
                </div>

                {/* Title & Tagline */}
                <div className="relative z-10 mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
                    {feat.title}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider font-mono">
                    {feat.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6 relative z-10">
                  {feat.description}
                </p>
              </div>

              {/* Bullet Features */}
              <div className="pt-5 border-t border-white/[0.08] relative z-10 space-y-2.5">
                {feat.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs md:text-sm text-slate-300">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}

          {/* Bottom Card: Google Workspace Integration */}
          <div className="lg:col-span-12 glass-panel p-7 md:p-8 border border-white/[0.1] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 border border-white/[0.1] flex items-center justify-center text-cyan-400 flex-shrink-0">
                <LayoutGrid className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                  Built Directly Into Google Docs, Sheets & Slides
                </h3>
                <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
                  Draft essays inside Docs, auto-generate formulas and data models in Sheets, and design presentation visuals in Slides without tab switching.
                </p>
              </div>
            </div>
            <span className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 whitespace-nowrap">
              Native Workspace Add-on
            </span>
          </div>

        </div>

        {/* Plan Transparency Note */}
        <p className="text-xs text-slate-500 text-center mt-10 max-w-3xl mx-auto font-mono">
          * Feature availability, usage quota, and storage allocations align with standard Google AI Pro academic parameters. Subscription active for 18 continuous calendar months.
        </p>

      </div>
    </section>
  );
}
