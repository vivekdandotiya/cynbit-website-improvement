import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, Download, ArrowRight, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function SubmissionSuccess({ inquiryResult, onReset }) {
  const [copied, setCopied] = useState(false);

  const referenceId = inquiryResult?.referenceId || 'CYN-2026-UNKNOWN';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referenceId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadBlueprintJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiryResult, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Cynbit-Blueprint-${referenceId}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 sm:p-12 rounded-[2.5rem] bg-slate-900/90 border border-emerald-500/30 shadow-2xl relative overflow-hidden animate-fadeIn text-center">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/2 translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Success Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 border-2 border-emerald-400/40 flex items-center justify-center mx-auto mb-6 shadow-glow-primary">
        <CheckCircle2 className="w-10 h-10 text-emerald-400" />
      </div>

      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest mb-3">
        Inquiry Registered Successfully
      </div>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
        Blueprint Transmitted to Cynbit Architects
      </h2>
      <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
        Thank you for trusting Cynbit Technologies. Your project specifications have been parsed and queued in our architectural triage pipeline.
      </p>

      {/* Reference ID Card */}
      <div className="bg-slate-950/80 p-6 rounded-2xl border border-white/10 max-w-lg mx-auto mb-8 text-left">
        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
          Your Official Inquiry Reference ID
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="font-mono text-xl sm:text-2xl font-black text-indigo-300 tracking-wider">
            {referenceId}
          </div>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all active:scale-95"
            title="Copy Reference ID"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-300" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-white/10 text-center text-xs">
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Priority</div>
            <div className="font-bold text-emerald-400 mt-0.5">{inquiryResult?.priority || 'HIGH'}</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Lead Score</div>
            <div className="font-bold text-indigo-300 mt-0.5">{inquiryResult?.qualificationScore || 88} / 100</div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-semibold">Response Window</div>
            <div className="font-bold text-cyan-300 mt-0.5">&lt; 24 Hours</div>
          </div>
        </div>
      </div>

      {/* Next steps pipeline */}
      <div className="bg-white/5 rounded-2xl p-6 mb-8 text-left">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400 block mb-4">
          Next Milestones in Our Discovery Protocol:
        </span>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              1
            </div>
            <div>
              <span className="font-bold text-white">System Parsing & Classification:</span>
              <p className="text-slate-400 mt-0.5">Automated technical stack categorization and lead prioritization completed.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              2
            </div>
            <div>
              <span className="font-bold text-white">Engineering Lead Review:</span>
              <p className="text-slate-400 mt-0.5">A senior architect in Jaipur reviews capability prerequisites and tech stack compatibility.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0 font-bold text-xs mt-0.5">
              3
            </div>
            <div>
              <span className="font-bold text-white">Personalized Blueprint & Discovery Sync:</span>
              <p className="text-slate-400 mt-0.5">We dispatch tailored scoping notes and a discovery call invite to <strong className="text-white">{inquiryResult?.contact?.email || 'your email'}</strong> within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={downloadBlueprintJSON}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/10"
        >
          <Download className="w-4 h-4 text-indigo-400" />
          <span>Download Blueprint (JSON)</span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-glow-primary active:scale-95"
        >
          <span>Configure Another Project</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
