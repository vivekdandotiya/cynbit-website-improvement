import React, { useEffect, useState } from 'react';
import { BarChart3, X, RefreshCw, Cpu, Layers, TrendingUp, Database, Shield } from 'lucide-react';
import { inquiryApi } from '../api/inquiryApi';

export default function InquiryStatsDrawer({ isOpen, onClose }) {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await inquiryApi.getStats();
      setStats(response.data);
    } catch (err) {
      console.warn('Failed to load stats', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStats();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-slate-900 border-l border-white/10 w-full max-w-md h-full p-6 sm:p-8 flex flex-col justify-between overflow-y-auto relative shadow-2xl">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Pipeline Analytics</h3>
                <p className="text-xs text-slate-400">Live Scoping Activity & Metrics</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stats Overview */}
          <div className="mt-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Scoped</span>
                <div className="text-3xl font-black text-white mt-1">
                  {stats ? stats.totalInquiries : '--'}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Inquiry blueprints</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-amber-400">High Priority</span>
                <div className="text-3xl font-black text-amber-400 mt-1">
                  {stats ? stats.highPriority : '--'}
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">Enterprise tier</span>
              </div>
            </div>

            {/* Service Distribution */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-white/5 space-y-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-300 block">
                Service Demand Breakdown
              </span>

              <div className="space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-indigo-400 font-semibold flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5" />
                      AI Automation Suite
                    </span>
                    <span className="text-slate-300 font-bold font-mono">
                      {stats?.serviceDistribution?.['ai-automation'] || 0}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: stats?.totalInquiries
                          ? `${Math.min(100, ((stats.serviceDistribution?.['ai-automation'] || 0) / stats.totalInquiries) * 100)}%`
                          : '50%'
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-amber-400 font-semibold flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Custom IT Services
                    </span>
                    <span className="text-slate-300 font-bold font-mono">
                      {stats?.serviceDistribution?.['custom-software'] || 0}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full"
                      style={{
                        width: stats?.totalInquiries
                          ? `${Math.min(100, ((stats.serviceDistribution?.['custom-software'] || 0) / stats.totalInquiries) * 100)}%`
                          : '40%'
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      Digital Marketing
                    </span>
                    <span className="text-slate-300 font-bold font-mono">
                      {stats?.serviceDistribution?.['digital-marketing'] || 0}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-cyan-400 rounded-full"
                      style={{
                        width: stats?.totalInquiries
                          ? `${Math.min(100, ((stats.serviceDistribution?.['digital-marketing'] || 0) / stats.totalInquiries) * 100)}%`
                          : '20%'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Storage Mode Transparency */}
            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
              <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
                <Database className="w-4 h-4 text-indigo-400" />
                <span>Persistence Architecture</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Storage: <strong className="text-white">{stats?.storageMode || 'In-Memory Demo Mode'}</strong>.
                Configured with seamless MongoDB Atlas adapter with fallback memory store.
              </p>
            </div>
          </div>
        </div>

        {/* Footer controls */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={fetchStats}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-all"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh Stats</span>
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
