import React from 'react';
import { Check } from 'lucide-react';

const STEPS = [
  { number: 1, title: 'Services', description: 'Pillars & Capabilities' },
  { number: 2, title: 'Scope', description: 'Timeline & Budget' },
  { number: 3, title: 'Details', description: 'Tech & Objectives' },
  { number: 4, title: 'Contact', description: 'Organization Info' },
  { number: 5, title: 'Review', description: 'Blueprint Summary' }
];

export default function StepProgress({ currentStep, onStepClick }) {
  const progressPercentage = ((currentStep - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 px-4">
      {/* Top progress bar */}
      <div className="relative mb-6">
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-indigo-400 transition-all duration-500 ease-out shadow-glow-primary"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Step nodes */}
      <div className="flex justify-between items-center relative">
        {STEPS.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;
          const isUpcoming = step.number > currentStep;

          return (
            <button
              key={step.number}
              onClick={() => {
                if (isCompleted) {
                  onStepClick(step.number);
                }
              }}
              disabled={isUpcoming}
              className={`flex flex-col items-center group transition-all duration-200 focus:outline-none ${
                isUpcoming ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              {/* Step circle indicator */}
              <div
                className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all duration-300 shadow-md ${
                  isCurrent
                    ? 'bg-indigo-600 text-white border-2 border-indigo-400 shadow-glow-primary scale-110'
                    : isCompleted
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 group-hover:bg-emerald-500/30'
                    : 'bg-slate-800 text-slate-400 border border-white/10'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" /> : step.number}
              </div>

              {/* Step labels */}
              <div className="mt-2 text-center hidden sm:block">
                <span
                  className={`block text-xs font-bold transition-colors ${
                    isCurrent ? 'text-white' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </span>
                <span className="block text-[10px] text-slate-400 font-medium">
                  {step.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
