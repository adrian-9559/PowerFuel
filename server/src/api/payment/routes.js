// routes.ts
const express = require('express');
const { getCustomerPaymentMethods, createCheckout } = require("./controller");
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
    try {
        const cart = req.body.cart;
        const userId = req.user.userId;
        const session = await createCheckout(cart, userId);
        res.json({clientSecret: session.client_secret});
    } catch (error) {
        console.error(error);
    }
});

router.get('/get-customer-payment-methods', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const paymentMethods = await getCustomerPaymentMethods(userId);
    res.send({paymentMethods});
});

module.exports = router;