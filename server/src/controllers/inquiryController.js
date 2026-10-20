const crypto = require('crypto');
const { InquiryRepository } = require('../models/inquiryModel');

/**
 * Generate human-friendly reference ID: CYN-2026-XXXXX
 */
function generateReferenceId() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `CYN-2026-${code}`;
}

/**
 * Calculate lead qualification score and priority tier
 */
function calculateLeadScoring(data) {
  let score = 50;

  // Services & capabilities clarity
  if (data.services && data.services.length > 0) score += 10;
  if (data.capabilities && data.capabilities.length > 0) score += Math.min(15, data.capabilities.length * 5);

  // Description depth
  if (data.projectDescription && data.projectDescription.length > 100) score += 10;
  if (data.integrations && data.integrations.length > 5) score += 5;

  // Budget & Timeline intent
  if (data.budgetTier === 'tier-3' || data.budgetTier === 'tier-4') score += 15;
  else if (data.budgetTier === 'tier-2') score += 10;

  // Determine priority
  let priority = 'STANDARD';
  if (score >= 80 || data.timeline === 'urgent' || data.budgetTier === 'tier-4') {
    priority = 'HIGH';
  } else if (score >= 65 || data.budgetTier === 'tier-3') {
    priority = 'MEDIUM';
  }

  return { score: Math.min(100, score), priority };
}

/**
 * Mask sensitive email (e.g. j***n@domain.com) for public reference lookups
 */
function maskEmail(email) {
  if (!email || !email.includes('@')) return email;
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}*@${domain}`;
  return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

/**
 * POST /api/inquiries
 * Submit a new qualified project inquiry
 */
async function createInquiry(req, res, next) {
  try {
    const rawData = req.body;
    const referenceId = generateReferenceId();
    const { score, priority } = calculateLeadScoring(rawData);

    // Anonymized IP hash for internal audit
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ipHash = crypto.createHash('sha256').update(ip).digest('hex').substring(0, 16);

    const inquiryRecord = {
      referenceId,
      services: rawData.services,
      capabilities: rawData.capabilities || [],
      projectStage: rawData.projectStage || 'greenfield',
      timeline: rawData.timeline || 'standard',
      budgetTier: rawData.budgetTier || 'tier-2',
      currency: rawData.currency || 'INR',
      projectDescription: rawData.projectDescription,
      targetPlatforms: rawData.targetPlatforms || [],
      integrations: rawData.integrations || '',
      contact: {
        fullName: rawData.contact.fullName,
        email: rawData.contact.email,
        company: rawData.contact.company || '',
        industry: rawData.contact.industry || '',
        phone: rawData.contact.phone || '',
        preferredContactMethod: rawData.contact.preferredContactMethod || 'email'
      },
      qualificationScore: score,
      priority,
      status: 'RECEIVED',
      estimatedResponseHours: 24,
      ipHash,
      submittedAt: new Date()
    };

    const saved = await InquiryRepository.create(inquiryRecord);

    return res.status(201).json({
      success: true,
      message: 'Inquiry received successfully! Cynbit engineering architects will review your blueprint.',
      data: {
        referenceId: saved.referenceId,
        status: saved.status,
        priority: saved.priority,
        qualificationScore: saved.qualificationScore,
        estimatedResponseHours: saved.estimatedResponseHours,
        contact: {
          fullName: saved.contact.fullName,
          email: saved.contact.email,
          company: saved.contact.company
        },
        services: saved.services,
        timeline: saved.timeline,
        budgetTier: saved.budgetTier,
        submittedAt: saved.submittedAt
      }
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/inquiries
 * List recent inquiries (for reviewer evaluation and administration)
 */
async function getInquiries(req, res, next) {
  try {
    const inquiries = await InquiryRepository.find({}, 20);
    // Sanitize contact info in public listing
    const sanitized = inquiries.map(item => ({
      referenceId: item.referenceId,
      services: item.services,
      capabilities: item.capabilities,
      projectStage: item.projectStage,
      timeline: item.timeline,
      budgetTier: item.budgetTier,
      priority: item.priority,
      status: item.status,
      qualificationScore: item.qualificationScore,
      submittedAt: item.submittedAt,
      company: item.contact?.company || 'Confidential Client',
      clientName: item.contact?.fullName || 'Anonymous'
    }));

    res.status(200).json({
      success: true,
      count: sanitized.length,
      data: sanitized
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/inquiries/stats
 * Aggregated analytics on inquiry trends
 */
async function getStats(req, res, next) {
  try {
    const stats = await InquiryRepository.getStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    next(error);
  }
}

/**
 * GET /api/inquiries/:referenceId
 * Lookup an inquiry status by reference ID
 */
async function getInquiryByReferenceId(req, res, next) {
  try {
    const { referenceId } = req.params;
    if (!referenceId) {
      return res.status(400).json({ success: false, message: 'Reference ID is required.' });
    }

    const inquiry = await InquiryRepository.findByReferenceId(referenceId.toUpperCase());
    if (!inquiry) {
      return res.status(404).json({
        success: false,
        message: `Inquiry with Reference ID "${referenceId}" was not found.`
      });
    }

    // Return sanitized view safe for client status tracking
    res.status(200).json({
      success: true,
      data: {
        referenceId: inquiry.referenceId,
        status: inquiry.status,
        priority: inquiry.priority,
        estimatedResponseHours: inquiry.estimatedResponseHours,
        services: inquiry.services,
        timeline: inquiry.timeline,
        budgetTier: inquiry.budgetTier,
        submittedAt: inquiry.submittedAt,
        clientName: inquiry.contact?.fullName,
        maskedEmail: maskEmail(inquiry.contact?.email)
      }
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createInquiry,
  getInquiries,
  getStats,
  getInquiryByReferenceId
};
