/**
 * Cynbit Technologies Service Catalog & Domain Constants
 * Derived from the official Cynbit Technologies portfolio (https://www.cynbit.in)
 */

const CYNBIT_SERVICES = [
  {
    id: 'ai-automation',
    title: 'AI Automation Suite',
    subtitle: 'Autonomous AI Agents & Cognitive Automation',
    icon: 'psychology_alt',
    theme: 'primary', // electric indigo
    description: 'Autonomous multi-agent workflows, LLM orchestration, custom AI voice agents, and cognitive business automation.',
    capabilities: [
      { id: 'autonomous-agents', label: 'Autonomous AI Agents', desc: 'Self-directed AI agents that execute complex cross-platform workflows' },
      { id: 'llm-automation', label: 'LLM Document & Data Ops', desc: 'RAG pipelines, automated data extraction, and semantic analysis' },
      { id: 'ai-voice-agents', label: 'AI Voice Agents', desc: 'Conversational voice bots with low-latency human-grade speech synthesis' },
      { id: 'ai-stack-integration', label: 'Enterprise AI Integration', desc: 'Embedding OpenAI, Anthropic, or custom local models into SaaS stacks' }
    ]
  },
  {
    id: 'custom-software',
    title: 'Custom IT Services',
    subtitle: 'Scalable Software Development & Cloud Solutions',
    icon: 'terminal',
    theme: 'tertiary', // amber/gold
    description: 'Modern enterprise full-stack web & mobile apps, microservices, cloud migration, and high-throughput systems.',
    capabilities: [
      { id: 'fullstack-web-mobile', label: 'Full-Stack Web & Mobile Apps', desc: 'React, Next.js, React Native, Node.js, and TypeScript architectures' },
      { id: 'backend-systems', label: 'Resilient Backend & Microservices', desc: 'High-concurrency REST & GraphQL APIs engineered for 99.9% uptime' },
      { id: 'cloud-infrastructure', label: 'Cloud Infrastructure & DevOps', desc: 'Zero-trust architecture, CI/CD pipelines across AWS, Azure, and GCP' },
      { id: 'legacy-migration', label: 'Legacy Monolith Modernization', desc: 'Refactoring outdated stacks into distributed, containerized systems' }
    ]
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    subtitle: 'Data-Driven Marketing & Technical SEO Engineering',
    icon: 'campaign',
    theme: 'secondary', // cyan/teal
    description: 'Algorithmic search dominance, automated CRM funnels, high-ROI paid performance, and conversion rate optimization.',
    capabilities: [
      { id: 'technical-seo', label: 'Technical SEO Engineering', desc: 'Core Web Vitals tuning, structured schema, and search engine platform dominance' },
      { id: 'performance-ads', label: 'Performance Ads & ROAS', desc: 'Data-driven Google & Meta advertising campaigns engineered for enterprise lead gen' },
      { id: 'crm-automation', label: 'CRM & Marketing Automation', desc: 'Automated nurture loops, lead scoring, and multi-channel pipeline sync' },
      { id: 'funnel-optimization', label: 'High-Conversion Funnels & CRO', desc: 'Data-backed landing page design and user journey optimization' }
    ]
  }
];

const BUDGET_TIERS = [
  { id: 'tier-1', label: 'Seed / Discovery', inr: '< ₹2,50,000', usd: '< $3,000', description: 'Proof of concept, prototype, or focused architectural audit' },
  { id: 'tier-2', label: 'Growth / Core', inr: '₹2,50,000 - ₹7,50,000', usd: '$3,000 - $10,000', description: 'End-to-end MVP, production AI agent, or custom web platform' },
  { id: 'tier-3', label: 'Scale / Enterprise', inr: '₹7,50,000 - ₹20,00,000', usd: '$10,000 - $25,000', description: 'Enterprise-grade multi-agent system, full SaaS platform, or cloud modernization' },
  { id: 'tier-4', label: 'Strategic Partnership', inr: '₹20,00,000+', usd: '$25,000+', description: 'Multi-quarter engagement, dedicated engineering squad, or ongoing platform scale' }
];

const TIMELINE_OPTIONS = [
  { id: 'urgent', label: 'Urgent (< 1 Month)', desc: 'Rapid sprint or expedited POC deployment' },
  { id: 'standard', label: '1 - 3 Months', desc: 'Standard agile delivery cycle for full features' },
  { id: 'quarterly', label: '3 - 6 Months', desc: 'Comprehensive enterprise solution or phase-by-phase rollout' },
  { id: 'flexible', label: '6+ Months / Ongoing', desc: 'Continuous product roadmap, retainer, or strategic development' }
];

const PROJECT_STAGES = [
  { id: 'greenfield', label: 'New Product / Greenfield', desc: 'Building from the ground up from concept to launch' },
  { id: 'scaling', label: 'Scaling Existing System', desc: 'Optimizing, refactoring, or expanding current live codebase' },
  { id: 'migration', label: 'Migration / Modernization', desc: 'Modernizing legacy architecture or moving to cloud/AI' },
  { id: 'consulting', label: 'Consultation & Discovery', desc: 'Feasibility analysis, solution architecture design, or tech audit' }
];

const COMPANY_INFO = {
  name: 'Cynbit Technologies',
  tagline: 'The Optimistic Architect — AI Automation & Software Solutions',
  headquarters: '32/115 Pratap Nagar, Jaipur, Rajasthan 302033, India',
  email: 'opportunities@cynbit.in',
  supportEmail: 'support@cynbit.in',
  phones: ['+91 89479 62667', '+91 78912 09777'],
  officialWebsite: 'https://www.cynbit.in'
};

module.exports = {
  CYNBIT_SERVICES,
  BUDGET_TIERS,
  TIMELINE_OPTIONS,
  PROJECT_STAGES,
  COMPANY_INFO
};
