const { v4: uuidv4 } = require('uuid');

class Tip {
  constructor(data) {
    this.id = uuidv4();
    this.title = data.title;
    this.description = data.description;
    this.crimeType = data.crimeType;
    this.location = data.location;
    this.urgency = data.urgency || 'medium';
    this.isAnonymous = data.isAnonymous || false;
    this.submissionChannel = data.submissionChannel; // 'app', 'sms', 'web', 'phone'
    this.contactInfo = data.isAnonymous ? null : data.contactInfo;
    this.status = 'pending';
    this.submittedAt = new Date().toISOString();
    this.attachments = data.attachments || [];
  }

  validate() {
    const errors = [];

    if (!this.description || this.description.trim().length < 10) {
      errors.push('Description must be at least 10 characters');
    }

    if (!this.crimeType) {
      errors.push('Crime type is required');
    }

    if (!this.location) {
      errors.push('Location is required');
    }

    if (!['low', 'medium', 'high', 'critical'].includes(this.urgency)) {
      errors.push('Invalid urgency level');
    }

    if (!['app', 'sms', 'web', 'phone'].includes(this.submissionChannel)) {
      errors.push('Invalid submission channel');
    }

    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      crimeType: this.crimeType,
      location: this.location,
      urgency: this.urgency,
      isAnonymous: this.isAnonymous,
      submissionChannel: this.submissionChannel,
      contactInfo: this.contactInfo,
      status: this.status,
      submittedAt: this.submittedAt,
      attachments: this.attachments
    };
  }
}

module.exports = Tip;
