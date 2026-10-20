import React from 'react';
import { Clock, DollarSign, Rocket, RefreshCw, BarChart2, Compass, Check } from 'lucide-react';

const STAGE_ICONS = {
  greenfield: Rocket,
  scaling: BarChart2,
  migration: RefreshCw,
  consulting: Compass,
};

export default function Step2Scope({ budgetTiers, timelineOptions, projectStages, formData, onChange, errors }) {
  const currentStage = formData.projectStage || 'greenfield';
  const currentTimeline = formData.timeline || 'standard';
  const currentBudget = formData.budgetTier || 'tier-2';
  const currency = formData.currency || 'INR';

  return (
    <div className="space-y-10 animate-fadeIn">
      {/* Step Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest mb-3">
          Step 2 of 5 • Timeline & Budget Scope
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Project Stage, Delivery Velocity & Budget Tier
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Define the operational maturity of your project and target milestones to align engineering squads.
        </p>
      </div>

      {/* 1. Project Stage Selection */}
      <div className="space-y-4">
        <label className="text-xs font-black uppercase tracking-widest text-slate-300 block">
          1. Current Operational Phase
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {projectStages.map((stage) => {
            const isSelected = currentStage === stage.id;
            const Icon = STAGE_ICONS[stage.id] || Rocket;

            return (
              <button
                type="button"
                key={stage.id}
                onClick={() => onChange({ projectStage: stage.id })}
                className={`p-4 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-indigo-950/60 border-indigo-500 ring-2 ring-indigo-500/30 shadow-glow-primary'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${isSelected ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-400'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-indigo-400" />}
                </div>
                <div>
                  <div className="text-sm font-bold text-white mb-1">{stage.label}</div>
                  <div className="text-[11px] text-slate-400 leading-snug">{stage.desc}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Timeline Options */}
      <div className="space-y-4">
        <label className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-cyan-400" />
          <span>2. Target Delivery Horizon</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {timelineOptions.map((timeline) => {
            const isSelected = currentTimeline === timeline.id;

            return (
              <button
                type="button"
                key={timeline.id}
                onClick={() => onChange({ timeline: timeline.id })}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/50 border-cyan-400 ring-2 ring-cyan-400/20 shadow-glow-secondary'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-white">{timeline.label}</span>
                  {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                </div>
                <p className="text-[11px] text-slate-400">{timeline.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Budget Tier Configuration */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-amber-400" />
            <span>3. Target Investment Bracket</span>
          </label>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-white/10 rounded-xl text-xs font-bold">
            <button
              type="button"
              onClick={() => onChange({ currency: 'INR' })}
              className={`px-3 py-1 rounded-lg transition-all ${
                currency === 'INR' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              INR (₹)
            </button>
            <button
              type="button"
              onClick={() => onChange({ currency: 'USD' })}
              className={`px-3 py-1 rounded-lg transition-all ${
                currency === 'USD' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {budgetTiers.map((tier) => {
            const isSelected = currentBudget === tier.id;
            const priceTag = currency === 'INR' ? tier.inr : tier.usd;

            return (
              <button
                type="button"
                key={tier.id}
                onClick={() => onChange({ budgetTier: tier.id })}
                className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-400 ring-2 ring-amber-400/20 shadow-glow-tertiary'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20 hover:bg-slate-900/80'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400/90">{tier.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <div className="text-lg font-black text-white my-2">{priceTag}</div>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 border-t border-white/5 pt-2">{tier.description}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
