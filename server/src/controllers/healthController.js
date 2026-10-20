const { getDatabaseStatus } = require('../config/db');

/**
 * Health check endpoint controller
 */
function getHealth(req, res) {
  const dbStatus = getDatabaseStatus();

  res.status(200).json({
    status: 'healthy',
    service: 'Cynbit Guided Inquiry API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
    database: dbStatus,
    company: 'Cynbit Technologies (Jaipur, India)',
    endpoints: {
      health: 'GET /api/health',
      services: 'GET /api/services',
      inquiries: 'POST /api/inquiries',
      stats: 'GET /api/inquiries/stats',
      lookup: 'GET /api/inquiries/:referenceId'
    }
  });
}

module.exports = {
  getHealth
};
