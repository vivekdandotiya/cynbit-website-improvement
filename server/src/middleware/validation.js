/**
 * Input Validation & Sanitization Middleware
 */

// Email regex conforming to standard RFC 5322 simplified
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

/**
 * Sanitize strings to avoid basic injection or XSS payload strings
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/[<>]/g, '') // remove HTML angle brackets
    .trim();
}

/**
 * Validates the project inquiry submission payload
 */
function validateInquiry(req, res, next) {
  const errors = [];
  const body = req.body || {};

  // 1. Service validation
  if (!body.services || !Array.isArray(body.services) || body.services.length === 0) {
    errors.push({ field: 'services', message: 'At least one service category must be selected.' });
  } else {
    const validServices = ['ai-automation', 'custom-software', 'digital-marketing'];
    const invalidService = body.services.find(s => !validServices.includes(s));
    if (invalidService) {
      errors.push({ field: 'services', message: `Invalid service identifier: ${invalidService}` });
    }
  }

  // 2. Timeline validation
  const validTimelines = ['urgent', 'standard', 'quarterly', 'flexible'];
  if (body.timeline && !validTimelines.includes(body.timeline)) {
    errors.push({ field: 'timeline', message: 'Invalid timeline option selected.' });
  }

  // 3. Budget Tier validation
  const validBudgetTiers = ['tier-1', 'tier-2', 'tier-3', 'tier-4'];
  if (body.budgetTier && !validBudgetTiers.includes(body.budgetTier)) {
    errors.push({ field: 'budgetTier', message: 'Invalid budget tier selected.' });
  }

  // 4. Project Stage validation
  const validStages = ['greenfield', 'scaling', 'migration', 'consulting'];
  if (body.projectStage && !validStages.includes(body.projectStage)) {
    errors.push({ field: 'projectStage', message: 'Invalid project stage selected.' });
  }

  // 5. Project Description validation
  if (!body.projectDescription || typeof body.projectDescription !== 'string' || body.projectDescription.trim().length < 15) {
    errors.push({ field: 'projectDescription', message: 'Project description is required and must be at least 15 characters.' });
  } else if (body.projectDescription.length > 2000) {
    errors.push({ field: 'projectDescription', message: 'Project description cannot exceed 2000 characters.' });
  }

  // 6. Contact Object validation
  const contact = body.contact || {};

  if (!contact.fullName || typeof contact.fullName !== 'string' || contact.fullName.trim().length < 2) {
    errors.push({ field: 'contact.fullName', message: 'Full name is required (minimum 2 characters).' });
  }

  if (!contact.email || typeof contact.email !== 'string' || !EMAIL_REGEX.test(contact.email.trim())) {
    errors.push({ field: 'contact.email', message: 'A valid email address is required.' });
  }

  if (contact.phone && typeof contact.phone === 'string' && contact.phone.length > 30) {
    errors.push({ field: 'contact.phone', message: 'Phone number cannot exceed 30 characters.' });
  }

  const validContactMethods = ['email', 'phone', 'video-call'];
  if (contact.preferredContactMethod && !validContactMethods.includes(contact.preferredContactMethod)) {
    errors.push({ field: 'contact.preferredContactMethod', message: 'Invalid preferred contact method.' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please review the highlighted issues.',
      errors
    });
  }

  // Sanitize and normalize inputs
  req.body.projectDescription = sanitizeString(body.projectDescription);
  req.body.contact.fullName = sanitizeString(contact.fullName);
  req.body.contact.email = contact.email.trim().toLowerCase();
  req.body.contact.company = sanitizeString(contact.company || '');
  req.body.contact.industry = sanitizeString(contact.industry || '');
  req.body.contact.phone = sanitizeString(contact.phone || '');
  req.body.integrations = sanitizeString(body.integrations || '');

  next();
}

module.exports = {
  validateInquiry,
  sanitizeString
};
