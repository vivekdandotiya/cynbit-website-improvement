import React from 'react';
import { Cpu, Layers, TrendingUp, CheckCircle, Plus } from 'lucide-react';

const ICON_MAP = {
  'ai-automation': Cpu,
  'custom-software': Layers,
  'digital-marketing': TrendingUp,
};

const THEME_STYLES = {
  primary: {
    badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    selectedBorder: 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-glow-primary',
    chipSelected: 'bg-indigo-600 text-white border-indigo-400',
    iconColor: 'text-indigo-400'
  },
  tertiary: {
    badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    selectedBorder: 'border-amber-500 ring-2 ring-amber-500/20 shadow-glow-tertiary',
    chipSelected: 'bg-amber-600 text-white border-amber-400',
    iconColor: 'text-amber-400'
  },
  secondary: {
    badge: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    selectedBorder: 'border-cyan-500 ring-2 ring-cyan-500/20 shadow-glow-secondary',
    chipSelected: 'bg-cyan-600 text-white border-cyan-400',
    iconColor: 'text-cyan-400'
  }
};

export default function Step1Services({ services, formData, onChange, errors }) {
  const selectedServices = formData.services || [];
  const selectedCapabilities = formData.capabilities || [];

  const toggleService = (serviceId) => {
    let nextServices;
    if (selectedServices.includes(serviceId)) {
      nextServices = selectedServices.filter(id => id !== serviceId);
    } else {
      nextServices = [...selectedServices, serviceId];
    }
    onChange({ services: nextServices });
  };

  const toggleCapability = (capId, serviceId) => {
    // If selecting capability of an unselected service, automatically activate that service
    let nextServices = [...selectedServices];
    if (!nextServices.includes(serviceId)) {
      nextServices.push(serviceId);
    }

    let nextCapabilities;
    if (selectedCapabilities.includes(capId)) {
      nextCapabilities = selectedCapabilities.filter(id => id !== capId);
    } else {
      nextCapabilities = [...selectedCapabilities, capId];
    }

    onChange({ services: nextServices, capabilities: nextCapabilities });
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Step Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          Step 1 of 5 • Service Architecture
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Select Required Service Pillars & Capabilities
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Choose the primary digital ecosystems your project requires. You may select multiple domains for hybrid or cross-functional systems.
        </p>
      </div>

      {errors.services && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm flex items-center gap-3">
          <span className="material-symbols-outlined text-lg">error</span>
          <span>{errors.services}</span>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const Icon = ICON_MAP[service.id] || Cpu;
          const styles = THEME_STYLES[service.theme] || THEME_STYLES.primary;

          return (
            <div
              key={service.id}
              className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between border ${
                isSelected
                  ? `bg-slate-900/90 ${styles.selectedBorder}`
                  : 'bg-slate-900/40 border-white/10 hover:border-white/20 hover:bg-slate-900/60'
              }`}
            >
              {/* Header card info */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${styles.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-white text-slate-900 shadow-md'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                        <span>Selected</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Select Pillar</span>
                      </>
                    )}
                  </button>
                </div>

                <h3 className="text-xl font-bold text-white tracking-tight mb-1">
                  {service.title}
                </h3>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">
                  {service.subtitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Sub-capabilities checklist */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
                  Specialized Capabilities:
                </span>
                <div className="space-y-2">
                  {service.capabilities.map((cap) => {
                    const isCapSelected = selectedCapabilities.includes(cap.id);
                    return (
                      <button
                        type="button"
                        key={cap.id}
                        onClick={() => toggleCapability(cap.id, service.id)}
                        className={`w-full text-left p-2.5 rounded-xl text-xs font-medium border transition-all flex items-center justify-between group ${
                          isCapSelected
                            ? styles.chipSelected
                            : 'bg-white/5 text-slate-300 border-white/5 hover:bg-white/10 hover:border-white/20'
                        }`}
                      >
                        <span className="font-semibold">{cap.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          isCapSelected ? 'bg-black/20 text-white' : 'text-slate-400 group-hover:text-slate-200'
                        }`}>
                          {isCapSelected ? 'Active' : '+ Add'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time selection summary pill */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <span className="font-bold text-white">Active Scope:</span>
          <span>
            {selectedServices.length} {selectedServices.length === 1 ? 'Pillar' : 'Pillars'} selected,{' '}
            {selectedCapabilities.length} {selectedCapabilities.length === 1 ? 'Capability' : 'Capabilities'} configured
          </span>
        </div>
        <div className="text-slate-400 italic text-[11px]">
          Click "Next: Project Scope" to configure project timelines and investment brackets.
        </div>
      </div>
    </div>
  );
}
