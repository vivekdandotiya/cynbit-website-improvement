import React from 'react';
import { Mail, Phone, Video, Building, Briefcase, User } from 'lucide-react';

export default function Step4Contact({ formData, onChange, errors }) {
  const contact = formData.contact || {};

  const handleContactChange = (field, value) => {
    onChange({
      contact: {
        ...contact,
        [field]: value
      }
    });
  };

  return (
    <div className="space-y-8 animate-fadeIn text-left">
      {/* Step Heading */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-3">
          Step 4 of 5 • Point of Contact
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Organization & Contact Details
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Tell us who our engineering architects should coordinate with. We respect your privacy and never spam.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-2">
          <label htmlFor="contact-fullname" className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>Full Name <span className="text-rose-400">*</span></span>
          </label>
          <input
            id="contact-fullname"
            type="text"
            value={contact.fullName || ''}
            onChange={(e) => handleContactChange('fullName', e.target.value)}
            placeholder="e.g. Alex Rivera"
            className={`w-full bg-slate-900/60 border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none ${
              errors['contact.fullName']
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
          {errors['contact.fullName'] && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>{errors['contact.fullName']}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-2">
          <label htmlFor="contact-email" className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-indigo-400" />
            <span>Business Email <span className="text-rose-400">*</span></span>
          </label>
          <input
            id="contact-email"
            type="email"
            value={contact.email || ''}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="alex@organization.com"
            className={`w-full bg-slate-900/60 border rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none ${
              errors['contact.email']
                ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500'
                : 'border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500'
            }`}
          />
          {errors['contact.email'] && (
            <p className="text-xs text-rose-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">error</span>
              <span>{errors['contact.email']}</span>
            </p>
          )}
        </div>

        {/* Company Name */}
        <div className="space-y-2">
          <label htmlFor="contact-company" className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span>Company / Startup (Optional)</span>
          </label>
          <input
            id="contact-company"
            type="text"
            value={contact.company || ''}
            onChange={(e) => handleContactChange('company', e.target.value)}
            placeholder="e.g. Nexus AI Corp"
            className="w-full bg-slate-900/60 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
          />
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label htmlFor="contact-industry" className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Industry Sector (Optional)</span>
          </label>
          <input
            id="contact-industry"
            type="text"
            value={contact.industry || ''}
            onChange={(e) => handleContactChange('industry', e.target.value)}
            placeholder="e.g. Fintech, Logistics, Healthcare, E-Commerce"
            className="w-full bg-slate-900/60 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
          />
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label htmlFor="contact-phone" className="text-xs font-black uppercase tracking-widest text-slate-300 flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>Phone Number (Optional)</span>
          </label>
          <input
            id="contact-phone"
            type="tel"
            value={contact.phone || ''}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="+91 98765 43210 or +1 415 555 0199"
            className="w-full bg-slate-900/60 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-slate-500 transition-all outline-none"
          />
        </div>

        {/* Preferred Contact Method */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-slate-300 block">
            Preferred Discovery Channel
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'email', label: 'Email Sync', icon: Mail },
              { id: 'video-call', label: 'Video Call', icon: Video },
              { id: 'phone', label: 'Direct Phone', icon: Phone },
            ].map(method => {
              const isSelected = (contact.preferredContactMethod || 'email') === method.id;
              const Icon = method.icon;
              return (
                <button
                  type="button"
                  key={method.id}
                  onClick={() => handleContactChange('preferredContactMethod', method.id)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                      : 'bg-slate-900/60 text-slate-400 border-white/10 hover:border-white/20 hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="truncate">{method.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
