import React from 'react';
import { ShieldCheck, Edit3, CheckCircle2, Clock, DollarSign, Cpu, Layers, TrendingUp, Send, Loader2 } from 'lucide-react';

export default function Step5Review({
  formData,
  services,
  budgetTiers,
  timelineOptions,
  projectStages,
  onEditStep,
  onSubmit,
  isSubmitting,
  submitError
}) {
  const selectedServices = services.filter(s => (formData.services || []).includes(s.id));
  const activeTimeline = timelineOptions.find(t => t.id === formData.timeline) || timelineOptions[1];
  const activeBudget = budgetTiers.find(b => b.id === formData.budgetTier) || budgetTiers[1];
  const activeStage = projectStages.find(p => p.id === formData.projectStage) || projectStages[0];
  const currency = formData.currency || 'INR';
  const priceDisplay = currency === 'INR' ? activeBudget.inr : activeBudget.usd;

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Step Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">
          Step 5 of 5 • Blueprint Verification
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Review Your Technical Project Blueprint
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Verify the parameters below before dispatching to Cynbit's solution architecture leads.
        </p>
      </div>

      {submitError && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-start gap-3">
          <span className="material-symbols-outlined text-rose-400 text-xl shrink-0 mt-0.5">error</span>
          <div>
            <div className="font-bold text-rose-200">Submission Error</div>
            <p className="mt-0.5">{submitError}</p>
          </div>
        </div>
      )}

      {/* Blueprint Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Card 1: Selected Services & Capabilities */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 relative group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-indigo-400 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              <span>Service Ecosystem</span>
            </span>
            <button
              type="button"
              onClick={() => onEditStep(1)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3">
            {selectedServices.map(srv => (
              <div key={srv.id} className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <div className="font-bold text-white text-sm">{srv.title}</div>
                <div className="text-[11px] text-slate-400 mt-1">{srv.subtitle}</div>
              </div>
            ))}
            
            {formData.capabilities && formData.capabilities.length > 0 && (
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                  Configured Modules:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {formData.capabilities.map(capId => (
                    <span key={capId} className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[11px] font-medium">
                      {capId.replace(/-/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Scope, Timeline & Budget */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 relative group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Timeline & Investment</span>
            </span>
            <button
              type="button"
              onClick={() => onEditStep(2)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Project Stage</div>
                <div className="text-sm font-bold text-white mt-0.5">{activeStage.label}</div>
              </div>
              <span className="text-xs text-indigo-400 font-semibold">{activeStage.desc}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-400">Target Horizon</div>
                <div className="text-sm font-bold text-white mt-0.5">{activeTimeline.label}</div>
              </div>
              <span className="text-xs text-cyan-400 font-semibold">{activeTimeline.desc}</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20">
              <div>
                <div className="text-[10px] uppercase font-bold text-amber-400">Budget Bracket ({currency})</div>
                <div className="text-base font-extrabold text-white mt-0.5">{priceDisplay}</div>
              </div>
              <span className="text-xs text-amber-300 font-semibold">{activeBudget.label}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Platforms & Integrations */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 relative group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              <span>Technical Target & Scope</span>
            </span>
            <button
              type="button"
              onClick={() => onEditStep(3)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                Target Platforms:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(formData.targetPlatforms || []).length > 0 ? (
                  formData.targetPlatforms.map(p => (
                    <span key={p} className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-semibold">
                      {p.toUpperCase()}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-slate-500 italic">Not specified (to be decided during discovery)</span>
                )}
              </div>
            </div>

            {formData.integrations && (
              <div className="pt-2 border-t border-white/5">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                  Integrations:
                </span>
                <p className="text-xs text-slate-300">{formData.integrations}</p>
              </div>
            )}

            <div className="pt-2 border-t border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">
                Project Blueprint Description:
              </span>
              <p className="text-xs text-slate-300 line-clamp-3 italic">
                "{formData.projectDescription}"
              </p>
            </div>
          </div>
        </div>

        {/* Card 4: Point of Contact */}
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-white/10 relative group">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Point of Contact</span>
            </span>
            <button
              type="button"
              onClick={() => onEditStep(4)}
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Full Name</span>
              <span className="font-bold text-white">{formData.contact?.fullName}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-white/5">
              <span className="text-slate-400">Work Email</span>
              <span className="font-bold text-indigo-300">{formData.contact?.email}</span>
            </div>
            {formData.contact?.company && (
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Company</span>
                <span className="font-bold text-white">{formData.contact.company}</span>
              </div>
            )}
            {formData.contact?.industry && (
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Industry</span>
                <span className="text-slate-300">{formData.contact.industry}</span>
              </div>
            )}
            {formData.contact?.phone && (
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-slate-400">Phone</span>
                <span className="text-slate-300">{formData.contact.phone}</span>
              </div>
            )}
            <div className="flex justify-between py-2">
              <span className="text-slate-400">Preferred Channel</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-slate-200 font-semibold uppercase text-[10px]">
                {formData.contact?.preferredContactMethod || 'Email'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Assurance banner & Submit */}
      <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">Guaranteed Response Sync Within 24 Hours</div>
            <p className="text-xs text-slate-400 mt-0.5">
              Our lead software architect and AI engineer will conduct an initial feasibility scan and assign dedicated triage.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="w-full sm:w-auto px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-primary active:scale-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Transmitting Blueprint...</span>
            </>
          ) : (
            <>
              <span>Dispatch Blueprint</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
