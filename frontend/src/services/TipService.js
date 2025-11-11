import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

class TipService {
  /**
   * Submit a tip through the mobile app
   * @param {Object} tipData - The tip data to submit
   * @returns {Promise} API response
   */
  static async submitTip(tipData) {
    try {
      const response = await axios.post(`${API_BASE_URL}/tips/submit`, {
        ...tipData,
        submissionChannel: 'app'
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit tip');
    }
  }

  /**
   * Get all submitted tips
   * @param {Object} filters - Optional filters
   * @returns {Promise} List of tips
   */
  static async getTips(filters = {}) {
    try {
      const params = new URLSearchParams(filters);
      const response = await axios.get(`${API_BASE_URL}/tips?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tips');
    }
  }

  /**
   * Get a specific tip by ID
   * @param {string} id - Tip ID
   * @returns {Promise} Tip details
   */
  static async getTipById(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/tips/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tip');
    }
  }

  /**
   * Get statistics
   * @returns {Promise} Statistics data
   */
  static async getStatistics() {
    try {
      const response = await axios.get(`${API_BASE_URL}/tips/statistics`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch statistics');
    }
  }
}

export default TipService;
