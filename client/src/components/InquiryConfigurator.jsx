import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import StepProgress from './StepProgress';
import Step1Services from './Step1Services';
import Step2Scope from './Step2Scope';
import Step3Details from './Step3Details';
import Step4Contact from './Step4Contact';
import Step5Review from './Step5Review';
import SubmissionSuccess from './SubmissionSuccess';
import { inquiryApi } from '../api/inquiryApi';

const INITIAL_FORM_DATA = {
  services: ['ai-automation'],
  capabilities: ['autonomous-agents'],
  projectStage: 'greenfield',
  timeline: 'standard',
  budgetTier: 'tier-2',
  currency: 'INR',
  targetPlatforms: ['web'],
  integrations: '',
  projectDescription: '',
  contact: {
    fullName: '',
    email: '',
    company: '',
    industry: '',
    phone: '',
    preferredContactMethod: 'email'
  }
};

export default function InquiryConfigurator({ serviceCatalog, onSubmissionCompleted }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);

  const services = serviceCatalog?.services || [];
  const budgetTiers = serviceCatalog?.budgetTiers || [];
  const timelineOptions = serviceCatalog?.timelineOptions || [];
  const projectStages = serviceCatalog?.projectStages || [];

  // Update form state partially
  const updateFormData = (patch) => {
    setFormData(prev => ({
      ...prev,
      ...patch
    }));
    // Clear relevant errors
    if (patch.services && errors.services) {
      setErrors(prev => ({ ...prev, services: null }));
    }
    if (patch.projectDescription && errors.projectDescription) {
      setErrors(prev => ({ ...prev, projectDescription: null }));
    }
    if (patch.contact) {
      setErrors(prev => ({
        ...prev,
        'contact.fullName': null,
        'contact.email': null
      }));
    }
  };

  // Step Validation logic
  const validateCurrentStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.services || formData.services.length === 0) {
        newErrors.services = 'Please select at least one service pillar to continue.';
      }
    } else if (currentStep === 3) {
      if (!formData.projectDescription || formData.projectDescription.trim().length < 15) {
        newErrors.projectDescription = 'Please provide at least 15 characters describing your project requirements.';
      }
    } else if (currentStep === 4) {
      const contact = formData.contact || {};
      if (!contact.fullName || contact.fullName.trim().length < 2) {
        newErrors['contact.fullName'] = 'Full name is required (minimum 2 characters).';
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!contact.email || !emailRegex.test(contact.email.trim())) {
        newErrors['contact.email'] = 'A valid business email address is required.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(5, prev + 1));
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(1, prev - 1));
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleEditStep = (stepNumber) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await inquiryApi.submitInquiry(formData);
      setSubmissionResult(response.data);
      if (onSubmissionCompleted) {
        onSubmissionCompleted(response.data);
      }
      window.scrollTo({ top: 300, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission failed', err);
      setSubmitError(err.message || 'Failed to submit inquiry. Please verify inputs or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setSubmissionResult(null);
    setCurrentStep(1);
    setErrors({});
  };

  // If successfully submitted, display confirmation screen
  if (submissionResult) {
    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <SubmissionSuccess
          inquiryResult={submissionResult}
          onReset={handleReset}
        />
      </section>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 relative" id="configurator">
      <div className="max-w-5xl mx-auto">
        
        {/* Step Progress Bar */}
        <StepProgress
          currentStep={currentStep}
          onStepClick={(step) => setCurrentStep(step)}
        />

        {/* Form Container Card */}
        <div className="glass-panel p-6 sm:p-10 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative">
          
          {/* Active Step Component */}
          {currentStep === 1 && (
            <Step1Services
              services={services}
              formData={formData}
              onChange={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 2 && (
            <Step2Scope
              budgetTiers={budgetTiers}
              timelineOptions={timelineOptions}
              projectStages={projectStages}
              formData={formData}
              onChange={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 3 && (
            <Step3Details
              formData={formData}
              onChange={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 4 && (
            <Step4Contact
              formData={formData}
              onChange={updateFormData}
              errors={errors}
            />
          )}

          {currentStep === 5 && (
            <Step5Review
              formData={formData}
              services={services}
              budgetTiers={budgetTiers}
              timelineOptions={timelineOptions}
              projectStages={projectStages}
              onEditStep={handleEditStep}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}

          {/* Bottom Navigation Buttons (Steps 1 to 4) */}
          {currentStep < 5 && (
            <div className="pt-10 mt-10 border-t border-white/10 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-bold text-xs uppercase tracking-wider transition-all border border-white/10 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest transition-all shadow-glow-primary active:scale-95 ml-auto"
              >
                <span>Continue to Step {currentStep + 1}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
