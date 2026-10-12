'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Cpu,
  HardDrive,
  Zap,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Flame,
  Activity,
  Layers,
  Database,
  Terminal,
} from 'lucide-react';

export default function LiveGemini3Animation() {
  const [activeStep, setActiveStep] = useState(0);
  const [tokensProcessed, setTokensProcessed] = useState(1485200);
  const [remainingSlots, setRemainingSlots] = useState(6);

  // Cycle the simulated live Gemini 3 Pro reasoning steps
  useEffect(() => {
    const stepInterval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3200);

    // Live token generation stream simulation
    const tokenInterval = setInterval(() => {
      setTokensProcessed((prev) => prev + Math.floor(Math.random() * 3200) + 1200);
    }, 400);

    return () => {
      clearInterval(stepInterval);
      clearInterval(tokenInterval);
    };
  }, []);

  const simulationStates = [
    {
      title: 'Gemini 3 Pro Deep Reasoning',
      code: 'gemini3_pro.synthesize(context: "1,200p thesis + 50k code")',
      metric: 'Latency: 0.38s',
      status: 'Active Inference',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
    },
    {
      title: '5 TB Google One Cloud Allocation',
      code: 'storage.reserve(capacity: "5,120 GB", encryption: "AES-256")',
      metric: '5,120 GB Ready',
      status: 'Drive & Photos Linked',
      badgeColor: 'text-violet-400 bg-violet-500/10 border-violet-500/30',
    },
    {
      title: 'Subsidized Grant Application',
      code: 'grant.apply_subsidy(retail: 35349, student_fee: 349)',
      metric: '৳35,000 Saved',
      status: '99% Subsidized',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
    },
    {
      title: 'Real-Time Quota Monitor',
      code: 'quota.check_batch(total: 100, claimed: 94, remaining: 6)',
      metric: 'Only 6 Slots Left',
      status: 'Critical Urgency',
      badgeColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30',
    },
  ];

  const currentSim = simulationStates[activeStep];

  return (
    <div className="relative mx-auto max-w-lg lg:max-w-none w-full">
      
      {/* Outer Multi-Layer Glow Halo */}
      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-cyan-500/30 via-indigo-500/30 to-rose-500/30 blur-2xl opacity-75 animate-pulse-glow pointer-events-none" />

      {/* Main Glassmorphic AI Reactor Card */}
      <div className="relative rounded-2xl sm:rounded-3xl glass-panel-elevated p-3.5 xs:p-5 sm:p-7 md:p-8 border border-white/[0.14] overflow-hidden shadow-2xl bg-navy-950/90 backdrop-blur-2xl">
        
        {/* Subtle Background Laser Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1px,transparent_1px)] [background-size:20px_20px] opacity-15 pointer-events-none" />

        {/* Top Header Row: System Status & Live Beacon */}
        <div className="relative z-10 flex items-center justify-between pb-3 sm:pb-4 border-b border-white/[0.08] mb-3 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-indigo-500 to-violet-600 p-0.5 shadow-md flex-shrink-0 animate-shimmer-glow">
              <div className="w-full h-full bg-navy-950 rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-cyan-300 animate-spin" style={{ animationDuration: '10s' }} />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-xs sm:text-sm font-extrabold text-white tracking-tight truncate">
                  Gemini 3 Pro Core
                </h3>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
              </div>
              <p className="text-[9.5px] sm:text-[11px] text-slate-400 font-mono truncate">
                5 TB Dedicated Engine · Active
              </p>
            </div>
          </div>

          <div className="text-right flex-shrink-0 ml-2">
            <span className="inline-flex items-center gap-1 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-mono font-bold bg-rose-500/15 text-rose-300 border border-rose-500/30 animate-pulse">
              <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-rose-400 fill-current" />
              <span>{remainingSlots} Left</span>
            </span>
          </div>
        </div>

        {/* Central Live Holographic Core Visual */}
        <div className="relative z-10 my-2 sm:my-4 flex items-center justify-center py-4 sm:py-5 min-h-[170px] xs:min-h-[190px] sm:min-h-[220px]">
          
          {/* Orbital Ring 1 (Slow Clockwise) */}
          <div className="absolute w-40 h-40 xs:w-48 xs:h-48 sm:w-60 sm:h-60 rounded-full border border-dashed border-cyan-500/20 animate-orbit-slow pointer-events-none" />

          {/* Orbital Ring 2 (Reverse Fast) */}
          <div className="absolute w-30 h-30 xs:w-36 xs:h-36 sm:w-48 sm:h-48 rounded-full border border-violet-500/25 animate-orbit-reverse pointer-events-none" />

          {/* Orbital Ring 3 (Inner Energy Field) */}
          <div className="absolute w-22 h-22 xs:w-26 xs:h-26 sm:w-36 sm:h-36 rounded-full border border-indigo-400/30 animate-pulse pointer-events-none" />

          {/* Central Reactor Orb */}
          <div className="relative w-18 h-18 xs:w-22 xs:h-22 sm:w-28 sm:h-28 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-indigo-950 via-navy-900 to-slate-900 border border-white/[0.2] p-1 shadow-[0_0_35px_rgba(6,182,212,0.4)] flex flex-col items-center justify-center text-center backdrop-blur-md group cursor-pointer hover:scale-105 transition-transform duration-300 z-10">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-tr from-cyan-500/15 to-violet-500/15 animate-pulse" />
            <Cpu className="w-5 h-5 sm:w-7 sm:h-7 text-cyan-300 mb-0.5 animate-bounce" style={{ animationDuration: '2.5s' }} />
            <span className="text-[9px] sm:text-[11px] font-extrabold text-white font-mono tracking-tight leading-none">
              GEMINI 3
            </span>
            <span className="text-[8px] sm:text-[9px] font-bold text-cyan-400 uppercase tracking-widest font-mono mt-0.5">
              PRO CORE
            </span>
          </div>

          {/* Floating Live Satellites */}
          {/* Satellite 1: 5 TB */}
          <div className="absolute top-0 right-1 xs:right-2 sm:right-6 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-navy-900/90 border border-violet-500/30 text-violet-300 text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-mono font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 backdrop-blur-md animate-float z-20">
            <HardDrive className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-violet-400 flex-shrink-0" />
            <span>5 TB Cloud</span>
          </div>

          {/* Satellite 2: Save ৳35,000 */}
          <div className="absolute bottom-0 left-1 xs:left-2 sm:left-4 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-lg sm:rounded-xl bg-navy-900/90 border border-emerald-500/30 text-emerald-300 text-[8.5px] xs:text-[9.5px] sm:text-[10px] font-mono font-bold shadow-lg flex items-center gap-1 sm:gap-1.5 backdrop-blur-md animate-float z-20" style={{ animationDelay: '1.5s' }}>
            <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400 fill-current flex-shrink-0" />
            <span>Save ~৳35k</span>
          </div>
        </div>

        {/* Live Audio / Frequency Token Waveform Indicator */}
        <div className="relative z-10 flex items-center justify-between px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-white/[0.02] border border-white/[0.06] mb-3 sm:mb-4">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
            <Activity className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 animate-pulse flex-shrink-0" />
            <span className="text-[9.5px] sm:text-[10px] font-mono text-slate-300 truncate">
              Token Waveform:
            </span>
          </div>
          <div className="flex items-end gap-0.5 sm:gap-1 h-4 sm:h-5 px-1 flex-shrink-0">
            <span className="w-0.5 sm:w-1 bg-cyan-400 rounded-full animate-sound-wave-1" />
            <span className="w-0.5 sm:w-1 bg-indigo-400 rounded-full animate-sound-wave-2" />
            <span className="w-0.5 sm:w-1 bg-violet-400 rounded-full animate-sound-wave-3" />
            <span className="w-0.5 sm:w-1 bg-pink-400 rounded-full animate-sound-wave-4" />
            <span className="w-0.5 sm:w-1 bg-emerald-400 rounded-full animate-sound-wave-2" />
            <span className="w-0.5 sm:w-1 bg-cyan-400 rounded-full animate-sound-wave-1" />
          </div>
          <div className="flex items-center justify-end min-w-[105px] flex-shrink-0">
            <span className="text-[9.5px] sm:text-[10px] font-mono font-bold text-cyan-300 tabular-nums whitespace-nowrap text-right">
              {tokensProcessed.toLocaleString()} tk/s
            </span>
          </div>
        </div>

        {/* Simulated Interactive Terminal Feed */}
        <div className="relative z-10 p-2.5 sm:p-3.5 rounded-xl bg-navy-950/90 border border-white/[0.08] mb-3 sm:mb-4 font-mono">
          <div className="flex items-center justify-between pb-1.5 sm:pb-2 mb-1.5 sm:mb-2 border-b border-white/[0.06]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500/80 inline-block flex-shrink-0" />
              <span className="w-2 h-2 rounded-full bg-amber-500/80 inline-block flex-shrink-0" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80 inline-block flex-shrink-0" />
              <span className="text-[9.5px] sm:text-[10px] text-slate-400 ml-1 font-semibold truncate">gemini3_runtime.sh</span>
            </div>
            <span className={`text-[8.5px] sm:text-[9px] font-bold px-1.5 py-0.5 rounded border ${currentSim.badgeColor} flex-shrink-0`}>
              {currentSim.status}
            </span>
          </div>

          <div className="text-[10px] sm:text-[11px] text-slate-200 truncate">
            <span className="text-cyan-400 mr-1.5">$</span>
            {currentSim.code}
          </div>

          <div className="flex items-center justify-between mt-1 text-[9.5px] sm:text-[10px] text-slate-400 pt-1">
            <span className="truncate pr-1 flex-1 min-w-0">&gt; {currentSim.title}</span>
            <span className="text-cyan-300 font-bold flex-shrink-0 min-w-[95px] text-right font-mono tabular-nums">{currentSim.metric}</span>
          </div>
        </div>

        {/* Urgency Progress Bar — 94% Claimed */}
        <div className="relative z-10 p-2.5 sm:p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/30 mb-3 sm:mb-4">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-bold text-white flex items-center gap-1.5 text-[10px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping flex-shrink-0" />
              Batch Quota Progress
            </span>
            <span className="font-mono font-bold text-rose-300 text-[10px] sm:text-xs tabular-nums">
              94 / 100 Claimed (94%)
            </span>
          </div>

          {/* Progress Track with Laser Sweep */}
          <div className="relative w-full h-2 sm:h-2.5 bg-navy-900 rounded-full overflow-hidden border border-white/[0.08]">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-rose-500 to-amber-400 rounded-full relative"
              style={{ width: '94%' }}
            >
              {/* Sweeping laser light */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-laser-sweep" />
            </div>
          </div>

          <div className="flex items-center justify-between text-[9.5px] sm:text-[10px] text-slate-300 mt-1.5">
            <span className="text-rose-300 font-semibold truncate mr-1">⚠️ Only 6 Slots Left in Quota</span>
            <span className="text-cyan-300 font-bold flex-shrink-0 font-mono">Fee: ৳349</span>
          </div>
        </div>

        {/* Action Button inside Visual Card with rigid sizing */}
        <div className="relative z-10 pt-1 w-full">
          <Link
            href="/payment"
            className="btn-primary w-full min-h-[48px] py-3.5 text-xs sm:text-sm font-extrabold rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform box-border text-center"
          >
            <span>Claim Slot #95 at ৳349</span>
            <ArrowRight className="w-4 h-4 flex-shrink-0" />
          </Link>
          <div className="flex items-center justify-center gap-2 sm:gap-3 text-[9.5px] sm:text-[10px] text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Save approx ৳35,000
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <HardDrive className="w-3 h-3 text-violet-400" />
              5 TB Cloud
            </span>
          </div>
        </div>

      </div>

    </div>
  );
}
