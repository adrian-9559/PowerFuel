// routes.ts
const express = require('express');
const { getCustomer, getCustomerCharges, createCheckoutSession } = require('./controller');
const { getPaymentMethods } = require("./checkoutController");

const router = express.Router();

router.get('/get-customer', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const customer = await getCustomer(userId);
    res.send(customer);
});

router.get('/get-customer-charges', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const charges = await getCustomerCharges(userId);
    res.send(charges);
});

router.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;
    const session = await createCheckoutSession(cart);
    res.send({clientSecret: session.client_secret});
});

router.get('/get-customer-payment-methods', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const paymentMethods = await getPaymentMethods(userId);
    res.send({paymentMethods});
});

module.exports = router;