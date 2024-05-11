// routes.ts
const express = require('express');
const { getCustomer, getCustomerCharges, createCheckoutSession } = require('./controller');

const router = express.Router();

router.get('/get-customer', async (req, res) => {
    const { userId } = req.user;
    const customer = await getCustomer(userId);
    res.send(customer);
});

router.get('/get-customer-charges', async (req, res) => {
    const { userId } = req.user;
    const charges = await getCustomerCharges(userId);
    res.send(charges);
});

router.post('/create-checkout-session', async (req, res) => {
    const { cart } = req.body;
    const session = await createCheckoutSession(cart);
    res.send({clientSecret: session.client_secret});
});

module.exports = router;