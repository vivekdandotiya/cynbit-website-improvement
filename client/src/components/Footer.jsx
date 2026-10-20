import React from 'react';
import { Mail, Phone, MapPin, Globe, Shield, Terminal, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#060910] border-t border-white/10 pt-16 pb-12 text-left relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-glow-primary">
                <span className="material-symbols-outlined text-xl">hub</span>
              </div>
              <span className="text-xl font-black tracking-tight text-white">CYNBIT TECHNOLOGIES</span>
            </div>
            
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm leading-relaxed">
              Architecting the digital future with autonomous AI agents, enterprise software engineering, and cognitive automation.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
                <Terminal className="w-3.5 h-3.5" />
                <span>Full Stack Developer Intern Technical Assessment</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              Official Hubs
            </span>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <a href="https://www.cynbit.in/services" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Services Hub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.cynbit.in/bitelevate" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>BitElevate Program</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.cynbit.in/case-studies" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Case Studies</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.cynbit.in/careers" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Careers</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4 space-y-3 text-xs text-slate-300">
            <span className="text-xs font-black uppercase tracking-widest text-slate-400 block">
              Jaipur Headquarters
            </span>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-tertiary shrink-0 mt-0.5 text-amber-400" />
              <span>32/115 Pratap Nagar, Jaipur, Rajasthan 302033, India</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
              <a href="mailto:opportunities@cynbit.in" className="hover:text-white transition-colors">
                opportunities@cynbit.in
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>+91 89479 62667 / +91 78912 09777</span>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Assessment Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2026 Cynbit Technologies. Assessment prototype crafted by <strong className="text-slate-300">Vivek Dandotiya</strong>.
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Independent assessment submission • Safe demonstration mode</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
