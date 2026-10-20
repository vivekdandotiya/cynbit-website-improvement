import React from 'react';
import { Sparkles, Cpu, Layers, TrendingUp, Clock, CheckCircle2 } from 'lucide-react';

export default function HeroSection({ selectedService, onQuickSelectService }) {
  return (
    <section className="relative pt-32 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-gradient-to-tr from-indigo-600/15 via-cyan-500/10 to-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Badges */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-semibold mb-6 shadow-glow-primary">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Optimistic Architecture • Guided Project Inquiry</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          Architect Your Next <br />
          <span className="text-gradient-primary">Digital Breakthrough</span> With Cynbit
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
          Skip the endless email ping-pong. Use our guided blueprint configurator to define your AI agents, custom software architectures, budget tiers, and delivery sprint timelines in under 3 minutes.
        </p>

        {/* Value Highlights */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-400 font-medium mb-10">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Structured Requirements Blueprint</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-400" />
            <span>Response Sync Within 24h</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Direct Architect Feasibility Review</span>
          </div>
        </div>

        {/* Quick Service Filters */}
        <div className="bg-slate-900/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 max-w-2xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-2">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-bold px-3 py-1">
            Core Pillars:
          </span>
          <button
            onClick={() => onQuickSelectService('ai-automation')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedService.includes('ai-automation')
                ? 'bg-indigo-600 text-white shadow-glow-primary'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>AI Automation</span>
          </button>
          <button
            onClick={() => onQuickSelectService('custom-software')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedService.includes('custom-software')
                ? 'bg-amber-600 text-white shadow-glow-tertiary'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Custom IT</span>
          </button>
          <button
            onClick={() => onQuickSelectService('digital-marketing')}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedService.includes('digital-marketing')
                ? 'bg-cyan-600 text-white shadow-glow-secondary'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Growth & SEO</span>
          </button>
        </div>

      </div>
    </section>
  );
}
