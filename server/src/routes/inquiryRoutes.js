const express = require('express');
const router = express.Router();
const {
  createInquiry,
  getInquiries,
  getStats,
  getInquiryByReferenceId
} = require('../controllers/inquiryController');
const { validateInquiry } = require('../middleware/validation');
const { submissionLimiter } = require('../middleware/rateLimiter');

// Analytical stats on inquiries
router.get('/stats', getStats);

// Lookup single inquiry by reference ID
router.get('/:referenceId', getInquiryByReferenceId);

// List inquiries (evaluation & admin view)
router.get('/', getInquiries);

// Submit new guided inquiry with rate limiting and validation
router.post('/', submissionLimiter, validateInquiry, createInquiry);

module.exports = router;
