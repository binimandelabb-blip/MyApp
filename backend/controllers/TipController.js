const TipService = require('../services/TipService');
const SMSGateway = require('../services/SMSGateway');

class TipController {
  // Submit a new tip through the app or web
  static async submitTip(req, res) {
    try {
      const tipData = {
        ...req.body,
        submissionChannel: req.body.submissionChannel || 'app'
      };

      const tip = TipService.submitTip(tipData);
      
      res.status(201).json({
        success: true,
        message: 'Tip submitted successfully',
        data: tip
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Submit tip via SMS
  static async submitSMSTip(req, res) {
    try {
      const smsGateway = SMSGateway.init();
      const messageData = smsGateway.parseIncomingMessage(req);
      
      // Parse tip from SMS message
      const tipInfo = smsGateway.parseTipFromMessage(messageData.message);
      
      if (!tipInfo) {
        // Send help message
        await smsGateway.sendSMS(messageData.from, 
          'To submit a tip, send: TIP <location> | <description>. Example: TIP Bole Street | Suspicious activity near bank');
        
        return res.status(200).json({
          success: false,
          message: 'Invalid tip format'
        });
      }

      // Submit the tip
      const smsData = {
        from: messageData.from,
        message: tipInfo.description,
        location: tipInfo.location
      };
      
      const tip = TipService.submitSMSTip(smsData);
      
      // Update tip with parsed information
      if (tipInfo.urgency) {
        tip.urgency = tipInfo.urgency;
      }
      if (tipInfo.crimeType) {
        tip.crimeType = tipInfo.crimeType;
      }
      
      // Send confirmation SMS
      await smsGateway.sendConfirmation(messageData.from, tip.id);
      
      res.status(201).json({
        success: true,
        message: 'SMS tip received',
        data: tip
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Submit tip via phone
  static async submitPhoneTip(req, res) {
    try {
      const tip = TipService.submitPhoneTip(req.body);
      
      res.status(201).json({
        success: true,
        message: 'Phone tip recorded',
        data: tip
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get all tips (for police dashboard)
  static async getAllTips(req, res) {
    try {
      const filters = {
        status: req.query.status,
        urgency: req.query.urgency,
        crimeType: req.query.crimeType
      };

      const tips = TipService.getAllTips(filters);
      
      res.status(200).json({
        success: true,
        count: tips.length,
        data: tips
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get a specific tip
  static async getTipById(req, res) {
    try {
      const tip = TipService.getTipById(req.params.id);
      
      res.status(200).json({
        success: true,
        data: tip
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Update tip status
  static async updateTipStatus(req, res) {
    try {
      const { status } = req.body;
      const tip = TipService.updateTipStatus(req.params.id, status);
      
      res.status(200).json({
        success: true,
        message: 'Tip status updated',
        data: tip
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  // Get statistics
  static async getStatistics(req, res) {
    try {
      const stats = TipService.getStatistics();
      
      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = TipController;
