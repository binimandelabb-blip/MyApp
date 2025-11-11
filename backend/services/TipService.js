const Tip = require('../models/Tip');

// In-memory storage for demonstration (replace with database in production)
const tips = [];

class TipService {
  // Submit a new tip
  static submitTip(tipData) {
    const tip = new Tip(tipData);
    
    const validationErrors = tip.validate();
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    tips.push(tip);
    
    // In a real application, notify police department
    this.notifyPolice(tip);
    
    return tip.toJSON();
  }

  // Get all tips (for police/admin dashboard)
  static getAllTips(filters = {}) {
    let filteredTips = [...tips];

    if (filters.status) {
      filteredTips = filteredTips.filter(tip => tip.status === filters.status);
    }

    if (filters.urgency) {
      filteredTips = filteredTips.filter(tip => tip.urgency === filters.urgency);
    }

    if (filters.crimeType) {
      filteredTips = filteredTips.filter(tip => tip.crimeType === filters.crimeType);
    }

    return filteredTips.map(tip => tip.toJSON());
  }

  // Get a specific tip by ID
  static getTipById(id) {
    const tip = tips.find(tip => tip.id === id);
    if (!tip) {
      throw new Error('Tip not found');
    }
    return tip.toJSON();
  }

  // Update tip status
  static updateTipStatus(id, status) {
    const tip = tips.find(tip => tip.id === id);
    if (!tip) {
      throw new Error('Tip not found');
    }

    const validStatuses = ['pending', 'reviewing', 'investigating', 'resolved', 'closed'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    tip.status = status;
    tip.updatedAt = new Date().toISOString();
    
    return tip.toJSON();
  }

  // Handle SMS tip submission
  static submitSMSTip(smsData) {
    const tipData = {
      title: 'SMS Tip',
      description: smsData.message,
      crimeType: 'general',
      location: smsData.location || 'Unknown',
      urgency: 'medium',
      isAnonymous: true,
      submissionChannel: 'sms',
      contactInfo: { phone: smsData.from }
    };

    return this.submitTip(tipData);
  }

  // Handle phone tip submission
  static submitPhoneTip(phoneData) {
    const tipData = {
      title: 'Phone Tip',
      description: phoneData.description,
      crimeType: phoneData.crimeType || 'general',
      location: phoneData.location,
      urgency: phoneData.urgency || 'medium',
      isAnonymous: phoneData.isAnonymous || false,
      submissionChannel: 'phone',
      contactInfo: phoneData.isAnonymous ? null : { phone: phoneData.phone }
    };

    return this.submitTip(tipData);
  }

  // Notify police (placeholder for actual implementation)
  static notifyPolice(tip) {
    console.log('Notifying police about new tip:', tip.id);
    // In production: send email, SMS, or push notification to police
  }

  // Get statistics
  static getStatistics() {
    return {
      total: tips.length,
      pending: tips.filter(t => t.status === 'pending').length,
      resolved: tips.filter(t => t.status === 'resolved').length,
      byChannel: {
        app: tips.filter(t => t.submissionChannel === 'app').length,
        sms: tips.filter(t => t.submissionChannel === 'sms').length,
        web: tips.filter(t => t.submissionChannel === 'web').length,
        phone: tips.filter(t => t.submissionChannel === 'phone').length
      },
      byUrgency: {
        low: tips.filter(t => t.urgency === 'low').length,
        medium: tips.filter(t => t.urgency === 'medium').length,
        high: tips.filter(t => t.urgency === 'high').length,
        critical: tips.filter(t => t.urgency === 'critical').length
      }
    };
  }
}

module.exports = TipService;
