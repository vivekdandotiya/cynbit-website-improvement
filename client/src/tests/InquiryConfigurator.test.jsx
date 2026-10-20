import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import InquiryConfigurator from '../components/InquiryConfigurator';

const MOCK_CATALOG = {
  services: [
    {
      id: 'ai-automation',
      title: 'AI Automation Suite',
      subtitle: 'Autonomous AI Agents',
      theme: 'primary',
      description: 'Autonomous workflows and agents.',
      capabilities: [
        { id: 'autonomous-agents', label: 'Autonomous AI Agents', desc: 'Self-directed AI agents' }
      ]
    },
    {
      id: 'custom-software',
      title: 'Custom IT Services',
      subtitle: 'Scalable Software',
      theme: 'tertiary',
      description: 'Web and mobile applications.',
      capabilities: [
        { id: 'fullstack-web-mobile', label: 'Full-Stack Apps', desc: 'React and Node' }
      ]
    }
  ],
  budgetTiers: [
    { id: 'tier-1', label: 'Seed / Discovery', inr: '< ₹2,50,000', usd: '< $3,000', description: 'POC' },
    { id: 'tier-2', label: 'Growth / Core', inr: '₹2.5L - ₹7.5L', usd: '$3k - $10k', description: 'MVP' }
  ],
  timelineOptions: [
    { id: 'urgent', label: 'Urgent (< 1 Month)', desc: 'Expedited' },
    { id: 'standard', label: '1 - 3 Months', desc: 'Standard agile delivery' }
  ],
  projectStages: [
    { id: 'greenfield', label: 'New Product / Greenfield', desc: 'Ground up build' },
    { id: 'scaling', label: 'Scaling Existing System', desc: 'Optimization' }
  ]
};

describe('InquiryConfigurator Component Test Suite', () => {
  it('renders Step 1 with service pillars and capabilities', () => {
    render(<InquiryConfigurator serviceCatalog={MOCK_CATALOG} />);
    expect(screen.getByText(/Select Required Service Pillars/i)).toBeInTheDocument();
    expect(screen.getByText('AI Automation Suite')).toBeInTheDocument();
    expect(screen.getByText('Custom IT Services')).toBeInTheDocument();
    expect(screen.getByText('Continue to Step 2')).toBeInTheDocument();
  });

  it('allows advancing to Step 2 and selecting budget & timeline', () => {
    render(<InquiryConfigurator serviceCatalog={MOCK_CATALOG} />);
    
    // Click Continue to Step 2
    const nextBtn = screen.getByText('Continue to Step 2');
    fireEvent.click(nextBtn);

    // Verify Step 2 rendered
    expect(screen.getByText(/Project Stage, Delivery Velocity & Budget Tier/i)).toBeInTheDocument();
    expect(screen.getByText('Continue to Step 3')).toBeInTheDocument();
  });

  it('validates minimum description length on Step 3', () => {
    render(<InquiryConfigurator serviceCatalog={MOCK_CATALOG} />);
    
    // Step 1 -> Step 2
    fireEvent.click(screen.getByText('Continue to Step 2'));
    // Step 2 -> Step 3
    fireEvent.click(screen.getByText('Continue to Step 3'));

    expect(screen.getByText(/Target Platforms & Project Specifications/i)).toBeInTheDocument();
    
    // Attempt to proceed without entering description
    const nextBtn = screen.getByText('Continue to Step 4');
    fireEvent.click(nextBtn);

    // Error must be displayed
    expect(screen.getByText(/Please provide at least 15 characters/i)).toBeInTheDocument();
  });

  it('preserves user inputs when navigating backward and forward', () => {
    render(<InquiryConfigurator serviceCatalog={MOCK_CATALOG} />);
    
    // Step 1 -> Step 2
    fireEvent.click(screen.getByText('Continue to Step 2'));
    
    // Select Urgent timeline
    const urgentBtn = screen.getByText('Urgent (< 1 Month)');
    fireEvent.click(urgentBtn);

    // Navigate back to Step 1
    const prevBtn = screen.getByText('Previous');
    fireEvent.click(prevBtn);

    expect(screen.getByText(/Select Required Service Pillars/i)).toBeInTheDocument();

    // Navigate forward to Step 2 again
    fireEvent.click(screen.getByText('Continue to Step 2'));

    // Urgent should still be active
    expect(screen.getByText('Urgent (< 1 Month)')).toBeInTheDocument();
  });
});
