const express = require('express');
const router = express.Router();
const TipController = require('../controllers/TipController');

// Submit tips through different channels
router.post('/submit', TipController.submitTip);
router.post('/submit/sms', TipController.submitSMSTip);
router.post('/submit/phone', TipController.submitPhoneTip);

// Get tips (for police/admin)
router.get('/', TipController.getAllTips);
router.get('/statistics', TipController.getStatistics);
router.get('/:id', TipController.getTipById);

// Update tip status
router.patch('/:id/status', TipController.updateTipStatus);

module.exports = router;
