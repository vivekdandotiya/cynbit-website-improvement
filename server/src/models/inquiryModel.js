const mongoose = require('mongoose');
const crypto = require('crypto');

// Mongoose Schema for MongoDB persistence
const inquirySchema = new mongoose.Schema({
  referenceId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  services: [{
    type: String,
    required: true
  }],
  capabilities: [{
    type: String
  }],
  projectStage: {
    type: String,
    enum: ['greenfield', 'scaling', 'migration', 'consulting'],
    default: 'greenfield'
  },
  timeline: {
    type: String,
    enum: ['urgent', 'standard', 'quarterly', 'flexible'],
    default: 'standard'
  },
  budgetTier: {
    type: String,
    enum: ['tier-1', 'tier-2', 'tier-3', 'tier-4'],
    default: 'tier-2'
  },
  currency: {
    type: String,
    enum: ['INR', 'USD'],
    default: 'INR'
  },
  projectDescription: {
    type: String,
    required: true,
    maxlength: 2000
  },
  targetPlatforms: [{
    type: String
  }],
  integrations: {
    type: String,
    maxlength: 500,
    default: ''
  },
  contact: {
    fullName: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 150
    },
    company: {
      type: String,
      trim: true,
      maxlength: 120,
      default: ''
    },
    industry: {
      type: String,
      trim: true,
      maxlength: 80,
      default: ''
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
      default: ''
    },
    preferredContactMethod: {
      type: String,
      enum: ['email', 'phone', 'video-call'],
      default: 'email'
    }
  },
  qualificationScore: {
    type: Number,
    default: 75
  },
  priority: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'STANDARD'],
    default: 'STANDARD'
  },
  status: {
    type: String,
    enum: ['RECEIVED', 'UNDER_REVIEW', 'ARCHITECT_ASSIGNED', 'PROPOSAL_READY'],
    default: 'RECEIVED'
  },
  estimatedResponseHours: {
    type: Number,
    default: 24
  },
  ipHash: {
    type: String
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

let MongooseInquiry;
try {
  MongooseInquiry = mongoose.model('Inquiry', inquirySchema);
} catch {
  MongooseInquiry = mongoose.models.Inquiry;
}

/**
 * In-Memory Demo Storage for environments without MongoDB.
 * Pre-seeded with 2 demo entries so reviewers can inspect inquiries immediately!
 */
class InMemoryInquiryStore {
  constructor() {
    this.inquiries = [
      {
        _id: 'demo-1001',
        referenceId: 'CYN-2026-DEMO1',
        services: ['ai-automation', 'custom-software'],
        capabilities: ['autonomous-agents', 'fullstack-web-mobile'],
        projectStage: 'greenfield',
        timeline: 'standard',
        budgetTier: 'tier-3',
        currency: 'INR',
        projectDescription: 'Building an enterprise multi-agent workflow system for customer support triage and ticket routing.',
        targetPlatforms: ['web', 'cloud'],
        integrations: 'Slack, Zendesk, Salesforce API',
        contact: {
          fullName: 'Arjun Mehta',
          email: 'arjun.mehta@example.com',
          company: 'Nexis FinTech',
          industry: 'Financial Technology',
          phone: '+91 98765 43210',
          preferredContactMethod: 'video-call'
        },
        qualificationScore: 92,
        priority: 'HIGH',
        status: 'UNDER_REVIEW',
        estimatedResponseHours: 24,
        submittedAt: new Date(Date.now() - 3600000 * 5)
      },
      {
        _id: 'demo-1002',
        referenceId: 'CYN-2026-DEMO2',
        services: ['custom-software'],
        capabilities: ['backend-systems', 'cloud-infrastructure'],
        projectStage: 'scaling',
        timeline: 'urgent',
        budgetTier: 'tier-2',
        currency: 'USD',
        projectDescription: 'Migrating backend architecture to AWS Kubernetes with zero-downtime CI/CD pipelines.',
        targetPlatforms: ['cloud'],
        integrations: 'AWS EKS, Datadog, GitHub Actions',
        contact: {
          fullName: 'Sarah Jenkins',
          email: 'sarah.j@techsphere.io',
          company: 'TechSphere Global',
          industry: 'Enterprise SaaS',
          phone: '+1 415 555 2671',
          preferredContactMethod: 'email'
        },
        qualificationScore: 85,
        priority: 'HIGH',
        status: 'RECEIVED',
        estimatedResponseHours: 24,
        submittedAt: new Date(Date.now() - 3600000 * 12)
      }
    ];
  }

  async create(data) {
    const newEntry = {
      _id: `mem-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      ...data,
      submittedAt: new Date()
    };
    this.inquiries.unshift(newEntry);
    return newEntry;
  }

  async find(query = {}) {
    return [...this.inquiries];
  }

  async findByReferenceId(referenceId) {
    return this.inquiries.find(item => item.referenceId === referenceId) || null;
  }

  async getStats() {
    const total = this.inquiries.length;
    const highPriority = this.inquiries.filter(i => i.priority === 'HIGH').length;
    const serviceCounts = {};
    this.inquiries.forEach(i => {
      (i.services || []).forEach(s => {
        serviceCounts[s] = (serviceCounts[s] || 0) + 1;
      });
    });
    return {
      totalInquiries: total,
      highPriority,
      serviceDistribution: serviceCounts,
      storageMode: 'In-Memory Demo Persistence'
    };
  }
}

const inMemoryStore = new InMemoryInquiryStore();

/**
 * Unified Repository Provider that routes to Mongoose if connected, or InMemoryStore if not.
 */
class InquiryRepository {
  static isUsingMongoose() {
    return mongoose.connection && mongoose.connection.readyState === 1;
  }

  static async create(inquiryData) {
    if (this.isUsingMongoose()) {
      const doc = new MongooseInquiry(inquiryData);
      return await doc.save();
    }
    return await inMemoryStore.create(inquiryData);
  }

  static async find(query = {}, limit = 50) {
    if (this.isUsingMongoose()) {
      return await MongooseInquiry.find(query).sort({ submittedAt: -1 }).limit(limit).lean();
    }
    return await inMemoryStore.find(query);
  }

  static async findByReferenceId(referenceId) {
    if (this.isUsingMongoose()) {
      return await MongooseInquiry.findOne({ referenceId }).lean();
    }
    return await inMemoryStore.findByReferenceId(referenceId);
  }

  static async getStats() {
    if (this.isUsingMongoose()) {
      const total = await MongooseInquiry.countDocuments();
      const highPriority = await MongooseInquiry.countDocuments({ priority: 'HIGH' });
      const inquiries = await MongooseInquiry.find({}, 'services').lean();
      const serviceCounts = {};
      inquiries.forEach(i => {
        (i.services || []).forEach(s => {
          serviceCounts[s] = (serviceCounts[s] || 0) + 1;
        });
      });
      return {
        totalInquiries: total,
        highPriority,
        serviceDistribution: serviceCounts,
        storageMode: 'MongoDB Atlas'
      };
    }
    return await inMemoryStore.getStats();
  }
}

module.exports = {
  InquiryRepository,
  MongooseInquiry
};
