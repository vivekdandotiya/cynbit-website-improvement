const {
  CYNBIT_SERVICES,
  BUDGET_TIERS,
  TIMELINE_OPTIONS,
  PROJECT_STAGES,
  COMPANY_INFO
} = require('../config/constants');

/**
 * Returns full service taxonomy and configurator options
 */
function getServices(req, res) {
  res.status(200).json({
    success: true,
    data: {
      services: CYNBIT_SERVICES,
      budgetTiers: BUDGET_TIERS,
      timelineOptions: TIMELINE_OPTIONS,
      projectStages: PROJECT_STAGES,
      company: COMPANY_INFO
    }
  });
}

module.exports = {
  getServices
};
