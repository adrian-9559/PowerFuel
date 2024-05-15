// routes.ts
const express = require('express');
const { getCustomer, getCustomerCharges } = require('./controller');

const router = express.Router();

router.get('/get-customer', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const customer = await getCustomer(userId);
    res.send(customer);
});

router.get('/get-customer-orders', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const charges = await getCustomerCharges(userId);
    res.send(charges);
});

module.exports = router;