import React, { useState } from 'react';
import { Search, X, Loader2, CheckCircle2, AlertCircle, Shield } from 'lucide-react';
import { inquiryApi } from '../api/inquiryApi';

export default function InquiryLookupModal({ isOpen, onClose }) {
  const [referenceId, setReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!referenceId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await inquiryApi.getInquiryByReferenceId(referenceId.trim());
      setResult(response.data);
    } catch (err) {
      setError(err.message || 'Inquiry not found. Please verify the Reference ID.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (id) => {
    setReferenceId(id);
    setError(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-slate-900 border border-white/10 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Track Inquiry Status</h3>
            <p className="text-xs text-slate-400">Enter your official reference ID</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleLookup} className="mt-6 space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1.5">
              Reference Code (e.g. CYN-2026-DEMO1)
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={referenceId}
                onChange={(e) => setReferenceId(e.target.value.toUpperCase())}
                placeholder="CYN-2026-XXXXX"
                className="flex-1 bg-slate-950 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-sm font-mono text-white placeholder-slate-600 outline-none uppercase"
              />
              <button
                type="submit"
                disabled={loading || !referenceId.trim()}
                className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Search</span>}
              </button>
            </div>
          </div>

          {/* Quick Demo Pre-fills */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Demo IDs:</span>
            <button
              type="button"
              onClick={() => handleFillDemo('CYN-2026-DEMO1')}
              className="text-indigo-400 hover:underline font-mono text-[11px]"
            >
              CYN-2026-DEMO1
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleFillDemo('CYN-2026-DEMO2')}
              className="text-cyan-400 hover:underline font-mono text-[11px]"
            >
              CYN-2026-DEMO2
            </button>
          </div>
        </form>

        {/* Error message */}
        {error && (
          <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Result Card */}
        {result && (
          <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-white/10 space-y-4 animate-fadeIn text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="font-mono font-bold text-indigo-300 text-sm">{result.referenceId}</span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
                {result.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Client Name</span>
                <span className="text-white font-medium">{result.clientName || 'Anonymous'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Masked Email</span>
                <span className="text-indigo-300 font-mono">{result.maskedEmail}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Priority Tier</span>
                <span className="text-amber-300 font-bold">{result.priority}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Response Window</span>
                <span className="text-slate-300 font-medium">&lt; {result.estimatedResponseHours || 24} Hours</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase text-slate-400 block font-semibold mb-1">Services In Scrutiny</span>
              <div className="flex flex-wrap gap-1">
                {(result.services || []).map(s => (
                  <span key={s} className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px] border border-white/5">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
