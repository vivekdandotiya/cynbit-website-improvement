import React from 'react';
import { Search, BarChart3, ShieldCheck, Activity } from 'lucide-react';

export default function Header({ apiHealthy, onOpenLookup, onOpenStats }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#090D16]/85 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Cynbit Logo and Brand */}
        <div className="flex items-center gap-4">
          <a href="https://www.cynbit.in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-indigo-600 to-cyan-500 flex items-center justify-center shadow-glow-primary group-hover:scale-105 transition-transform duration-300">
              <span className="material-symbols-outlined text-white text-2xl font-black">hub</span>
            </div>
            <div>
              <div className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                CYNBIT <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">STUDIO</span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">The Optimistic Architect</p>
            </div>
          </a>

          {/* Assessment Indicator Pill */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-white/10 text-[11px] text-slate-300">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
              <span className="font-medium text-slate-400">Candidate:</span>
              <span className="font-bold text-white">Vivek Dandotiya</span>
              <span className="text-slate-500">•</span>
              <span className="text-indigo-300 font-semibold">Full Stack Intern Assessment</span>
            </div>
          </div>
        </div>

        {/* Action Controls & Status */}
        <div className="flex items-center gap-3">
          {/* API Health Pill */}
          <div 
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border backdrop-blur-md transition-colors"
            style={{
              backgroundColor: apiHealthy ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
              borderColor: apiHealthy ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)',
              color: apiHealthy ? '#34D399' : '#F87171'
            }}
            title={apiHealthy ? 'Connected to Cynbit REST API Server (Port 5000)' : 'API offline or connecting...'}
          >
            <span className={`w-2 h-2 rounded-full ${apiHealthy ? 'bg-emerald-400 animate-ping' : 'bg-rose-500'}`}></span>
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{apiHealthy ? 'API Online' : 'API Connecting'}</span>
          </div>

          {/* Live Transparency Stats Button */}
          <button
            onClick={onOpenStats}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/40 transition-all hover:text-white"
            title="View Aggregated Project Scope Analytics"
          >
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Analytics</span>
          </button>

          {/* Lookup Inquiry Modal Button */}
          <button
            onClick={onOpenLookup}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-indigo-500/40 transition-all hover:text-white"
            title="Track submission status with your Reference ID"
          >
            <Search className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Track Inquiry</span>
          </button>

          {/* Official Site Link */}
          <a
            href="https://www.cynbit.in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-glow-primary transition-all active:scale-95"
          >
            <span>cynbit.in</span>
            <span className="material-symbols-outlined text-[14px]">north_east</span>
          </a>
        </div>
      </div>
    </header>
  );
}
