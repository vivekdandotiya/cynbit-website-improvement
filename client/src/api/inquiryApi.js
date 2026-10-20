/**
 * Cynbit API Client
 * Seamlessly interfaces with the Express backend with robust error handling and fallback resilience.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const error = new Error(data.message || `Request failed with status ${response.status}`);
      error.status = response.status;
      error.errors = data.errors || [];
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      const networkError = new Error('Cannot connect to Cynbit API backend. Please ensure the server is running on port 5000.');
      networkError.status = 503;
      throw networkError;
    }
    throw err;
  }
}

export const inquiryApi = {
  /**
   * Check backend server health status
   */
  async checkHealth() {
    return await request('/api/health');
  },

  /**
   * Fetch services, capabilities, budget tiers, and timelines
   */
  async getServices() {
    return await request('/api/services');
  },

  /**
   * Submit a complete guided project inquiry
   */
  async submitInquiry(payload) {
    return await request('/api/inquiries', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * Lookup inquiry status by reference ID
   */
  async getInquiryByReferenceId(referenceId) {
    return await request(`/api/inquiries/${encodeURIComponent(referenceId)}`);
  },

  /**
   * Fetch aggregated inquiry metrics
   */
  async getStats() {
    return await request('/api/inquiries/stats');
  }
};
