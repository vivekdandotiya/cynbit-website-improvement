import React from 'react';
import { Monitor, Smartphone, Cloud, Terminal, Bot, Cpu } from 'lucide-react';

const PLATFORMS = [
  { id: 'web', label: 'Web Application', icon: Monitor },
  { id: 'mobile', label: 'Mobile App (iOS/Android)', icon: Smartphone },
  { id: 'cloud', label: 'Cloud Infrastructure / DevOps', icon: Cloud },
  { id: 'api', label: 'API & Microservices', icon: Terminal },
  { id: 'ai-agent', label: 'Autonomous AI Agent System', icon: Bot },
];

export default function Step3Details({ formData, onChange, errors }) {
  const selectedPlatforms = formData.targetPlatforms || [];
  const description = formData.projectDescription || '';

  const togglePlatform = (platformId) => {
    let next;
    if (selectedPlatforms.includes(platformId)) {
      next = selectedPlatforms.filter(p => p !== platformId);
    } else {
      next = [...selectedPlatforms, platformId];
    }
    onChange({ targetPlatforms: next });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-3">
          Step 3 of 5 • Technical Blueprint
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Target Platforms & Project Specifications
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Provide contextual architectural requirements to help our engineering leads evaluate system feasibility.
        </p>
      </div>

      {/* Target Platforms */}
      <div className="space-y-3">
        <label className="text-xs font-black uppercase tracking-widest text-slate-300 block">
          Target Deployment Platforms (Select all that apply)
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {PLATFORMS.map((plat) => {
            const isSelected = selectedPlatforms.includes(plat.id);
            const Icon = plat.icon;

            return (
              <button
                type="button"
                key={plat.id}
                onClick={() => togglePlatform(plat.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all flex flex-col items-center justify-center text-center gap-2 ${
                  isSelected
                    ? 'bg-cyan-950/60 border-cyan-400 ring-2 ring-cyan-400/20 shadow-glow-secondary text-white'
                    : 'bg-slate-900/50 border-white/10 hover:border-white/20 text-slate-300'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-xs font-bold">{plat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Required Third-Party Integrations */}
      <div className="space-y-2 text-left">
        <label htmlFor="integrations-input" className="text-xs font-black uppercase tracking-widest text-slate-300 block">
          Key Integrations / Existing Systems (Optional)
        </label>
        <input
          id="integrations-input"
          type="text"
          value={formData.integrations || ''}
          onChange={(e) => onChange({ integrations: e.target.value })}
          placeholder="e.g. OpenAI API, Stripe, AWS S3, Salesforce, PostgreSQL, Discord Bot"
          className="w-full bg-slate-900/60 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
        />
        <p className="text-[11px] text-slate-400">
          List any current databases, third-party APIs, or cloud providers we should interface with.
        </p>
      </div>

      {/* Project Description */}
      <div className="space-y-2 text-left">
        <div className="flex items-center justify-between">
          <label htmlFor="project-desc-input" className="text-xs font-black uppercase tracking-widest text-slate-300">
            Project Objective & Functional Requirements <span className="text-rose-400">*</span>
          </label>
          <span className={`text-[11px] font-mono ${description.length < 15 ? 'text-amber-400' : 'text-slate-400'}`}>
            {description.length} / 2000 characters (min. 15)
          </span>
        </div>

        <textarea
          id="project-desc-input"
          rows={5}
          value={description}
          onChange={(e) => onChange({ projectDescription: e.target.value })}
          placeholder="Describe what you want to construct. For instance: 'We need an autonomous AI customer support triage agent that analyzes incoming tickets, synthesizes answers from our documentation, and escalates edge cases to engineers via Slack.'"
          className={`w-full bg-slate-900/60 border rounded-2xl p-5 text-sm text-white placeholder-slate-500 transition-all outline-none resize-none ${
            errors.projectDescription
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
              : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
          }`}
        />

        {errors.projectDescription && (
          <p className="text-xs text-rose-400 flex items-center gap-1.5 pt-1">
            <span className="material-symbols-outlined text-sm">error</span>
            <span>{errors.projectDescription}</span>
          </p>
        )}
      </div>
    </div>
  );
}
