import { GraduationCap, Code2, Stethoscope, LineChart, FileSpreadsheet, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface AcademicMajor {
  title: string;
  major: string;
  icon: React.ReactNode;
  accent: string;
  tag: string;
  description: string;
  sampleWorkflow: string;
}

const academicMajors: AcademicMajor[] = [
  {
    title: 'Code Architecture & Algorithms',
    major: 'Computer Science, EEE & Software Eng',
    icon: <Code2 className="w-6 h-6 text-cyan-400" />,
    accent: 'border-cyan-500/30 bg-cyan-500/5',
    tag: 'CSE / EEE / SWE',
    description: 'Feed whole repositories and compiler errors to Gemini 1.5 Pro. Trace memory leaks, refactor legacy code, and write automated test suites in seconds.',
    sampleWorkflow: '"Feed full 4,000-line React/Go repository → Identify concurrency race conditions and output optimized fix."',
  },
  {
    title: 'Clinical & Biomedical Synthesis',
    major: 'Medical, Pharmacy & Biochemistry',
    icon: <Stethoscope className="w-6 h-6 text-rose-400" />,
    accent: 'border-rose-500/30 bg-rose-500/5',
    tag: 'MBBS / Pharma / Biotech',
    description: 'Absorb complex clinical trial journals and pathology research without citation hallucination. Cross-check drug interactions and prepare viva flashcards.',
    sampleWorkflow: '"Upload 25 Lancet oncology studies → Synthesize phase-3 efficacy findings into a comparative summary table with source page numbers."',
  },
  {
    title: 'Financial Modeling & Case Studies',
    major: 'BBA, Economics & Data Analytics',
    icon: <LineChart className="w-6 h-6 text-amber-400" />,
    accent: 'border-amber-500/30 bg-amber-500/5',
    tag: 'BBA / Econ / Finance',
    description: 'Break down Harvard Business Review case studies, write executive memos, and automate Excel financial calculations through natural language prompts.',
    sampleWorkflow: '"Analyze annual balance sheet PDF → Generate discounted cash flow model formulas and 5 key strategic risks."',
  },
  {
    title: 'Final Year Thesis & Defense Prep',
    major: 'Master\'s & Undergraduate Capstone',
    icon: <FileSpreadsheet className="w-6 h-6 text-indigo-400" />,
    accent: 'border-indigo-500/30 bg-indigo-500/5',
    tag: 'Thesis / Defense / Capstone',
    description: 'Upload your entire bibliography into NotebookLM. Listen to AI audio discussions to prepare for oral defense questions and identify gaps in literature review.',
    sampleWorkflow: '"Synthesize 40 dissertation citations → Generate 10 anticipated challenging defense questions with counter-arguments."',
  },
];

export default function StudentUseCases() {
  return (
    <section id="use-cases" className="section-spacing relative bg-navy-900/60 border-y border-white/[0.06]">
      <div className="container-main relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-4 h-4" />
            <span>Built for Bangladeshi Universities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5">
            Engineered for How Top Students Work.
          </h2>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Whether preparing for competitive semester exams, running complex laboratory analyses, or defending your final year thesis.
          </p>
        </div>

        {/* Majors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {academicMajors.map((major) => (
            <div
              key={major.title}
              className="glass-card-interactive p-5 sm:p-7 md:p-8 flex flex-col justify-between border border-white/[0.08]"
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
                    {major.icon}
                  </div>
                  <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold text-white bg-white/[0.05] border border-white/[0.1]">
                    {major.tag}
                  </span>
                </div>

                {/* Major Category */}
                <span className="text-xs font-semibold text-slate-400 block mb-1">
                  {major.major}
                </span>
                <h3 className="text-xl font-bold text-white mb-3">
                  {major.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {major.description}
                </p>
              </div>

              {/* Sample Student Prompt Box */}
              <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/[0.06] mt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block mb-1">
                  ⚡ Live Prompt Scenario
                </span>
                <p className="text-xs text-slate-400 italic leading-snug">
                  {major.sampleWorkflow}
                </p>
              </div>

            </div>
          ))}
        </div>

        {/* Academic Integrity & Ethics Banner */}
        <div className="mt-14 max-w-4xl mx-auto glass-panel p-6 border border-emerald-500/20 bg-emerald-950/10 rounded-2xl flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1">
              Academic Integrity First & Responsible AI Learning
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Google AI Pro tools are designed as research accelerators and conceptual tutors to empower your intellect, not to replace independent critical thinking. Always verify primary sources and comply with your institution&apos;s academic honor code.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
