const express = require('express');
const router = express.Router();
const { confirmPayment } = require('./controller');
router.post("/create-payment-intent", confirmPayment);

module.exports = router;