// SMS Gateway Service for handling SMS tip submissions
// This is an example implementation that can be adapted for different SMS providers

class SMSGateway {
  constructor(config) {
    this.provider = config.provider; // 'twilio', 'nexmo', 'africas_talking', etc.
    this.apiKey = config.apiKey;
    this.apiSecret = config.apiSecret;
    this.senderId = config.senderId || 'CrimeTips';
  }

  /**
   * Initialize SMS gateway based on provider
   */
  static init() {
    const provider = process.env.SMS_GATEWAY || 'twilio';
    
    const config = {
      provider: provider,
      apiKey: process.env.SMS_API_KEY,
      apiSecret: process.env.SMS_API_SECRET,
      senderId: process.env.SMS_SENDER_ID || 'CrimeTips'
    };

    return new SMSGateway(config);
  }

  /**
   * Handle incoming SMS webhook
   * Different providers have different webhook formats
   */
  parseIncomingMessage(req) {
    const body = req.body;
    const query = req.query;

    switch (this.provider) {
      case 'twilio':
        return {
          from: body.From || query.From,
          message: body.Body || query.Body,
          to: body.To || query.To,
          messageId: body.MessageSid || query.MessageSid
        };

      case 'africas_talking':
        return {
          from: body.from || query.from,
          message: body.text || query.text,
          to: body.to || query.to,
          messageId: body.id || query.id
        };

      case 'nexmo':
        return {
          from: body.msisdn || query.msisdn,
          message: body.text || query.text,
          to: body.to || query.to,
          messageId: body['message-id'] || query['message-id']
        };

      default:
        // Generic format
        return {
          from: body.from || query.from,
          message: body.message || body.text || query.message || query.text,
          to: body.to || query.to,
          messageId: body.id || query.id
        };
    }
  }

  /**
   * Parse tip information from SMS message
   * Supports different formats:
   * - Simple: "TIP <description>"
   * - Detailed: "TIP <location> | <description>"
   * - With urgency: "TIP URGENT <location> | <description>"
   */
  parseTipFromMessage(message) {
    const text = message.trim();
    
    // Check if message starts with TIP keyword
    if (!text.toUpperCase().startsWith('TIP')) {
      return null;
    }

    // Remove TIP prefix
    let content = text.substring(3).trim();
    
    // Check for urgency keywords
    let urgency = 'medium';
    const urgencyKeywords = {
      'URGENT': 'critical',
      'HIGH': 'high',
      'EMERGENCY': 'critical',
      'CRITICAL': 'critical'
    };

    for (const [keyword, level] of Object.entries(urgencyKeywords)) {
      if (content.toUpperCase().startsWith(keyword)) {
        urgency = level;
        content = content.substring(keyword.length).trim();
        break;
      }
    }

    // Parse location and description
    let location = 'Location not specified';
    let description = content;

    if (content.includes('|')) {
      const parts = content.split('|');
      location = parts[0].trim();
      description = parts[1].trim();
    } else if (content.includes(':')) {
      const parts = content.split(':');
      location = parts[0].trim();
      description = parts[1].trim();
    }

    // Extract crime type from keywords
    const crimeKeywords = {
      'theft': ['theft', 'steal', 'stolen', 'robbed', 'burglary'],
      'assault': ['assault', 'fight', 'attack', 'violence'],
      'drugs': ['drug', 'drugs', 'narcotic', 'substance'],
      'suspicious_activity': ['suspicious', 'strange', 'unusual'],
      'traffic': ['accident', 'traffic', 'speeding']
    };

    let crimeType = 'general';
    const lowerDescription = description.toLowerCase();
    
    for (const [type, keywords] of Object.entries(crimeKeywords)) {
      if (keywords.some(keyword => lowerDescription.includes(keyword))) {
        crimeType = type;
        break;
      }
    }

    return {
      description: description,
      location: location,
      urgency: urgency,
      crimeType: crimeType
    };
  }

  /**
   * Send confirmation SMS
   */
  async sendConfirmation(to, tipId) {
    const message = `Your crime tip has been received and is being reviewed. Reference ID: ${tipId.substring(0, 8)}. Thank you for helping keep our community safe.`;
    
    return this.sendSMS(to, message);
  }

  /**
   * Send SMS (implement based on provider)
   */
  async sendSMS(to, message) {
    console.log(`Sending SMS to ${to}: ${message}`);
    
    // In production, implement actual SMS sending based on provider
    // Example for Twilio:
    // const client = require('twilio')(this.apiKey, this.apiSecret);
    // return client.messages.create({
    //   body: message,
    //   from: this.senderId,
    //   to: to
    // });

    return Promise.resolve({
      success: true,
      messageId: 'mock-' + Date.now()
    });
  }

  /**
   * Send SMS notification to police about urgent tip
   */
  async notifyPoliceUrgent(tip) {
    const policeNumbers = process.env.POLICE_SMS_NUMBERS?.split(',') || [];
    
    if (policeNumbers.length === 0) {
      console.log('No police numbers configured for SMS notifications');
      return;
    }

    const message = `URGENT TIP: ${tip.crimeType.toUpperCase()} reported at ${tip.location}. Check dashboard for details. ID: ${tip.id.substring(0, 8)}`;

    const promises = policeNumbers.map(number => 
      this.sendSMS(number.trim(), message)
    );

    return Promise.all(promises);
  }
}

module.exports = SMSGateway;
