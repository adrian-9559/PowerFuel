// routes.ts
const express = require('express');
const { getCustomerPaymentMethods, createCheckout, getLastPayment, getUserPayments } = require("./controller");
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
    try {
        const userId = req.user.userId??req.query.userId;
        const paymentMethods = await getCustomerPaymentMethods(userId);
        res.send(paymentMethods);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error fetching payment methods'});
    }
});

router.get('/last-payment', async (req, res) => {
    try {
        const userId = req.user.userId??req.query.userId;
        const lastPayment = await getLastPayment(userId);
        res.send(lastPayment);
    } catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error fetching last payment'});
    }
});

router.get('/get-customer-orders', async (req, res) => {
    try {
        const userId = req.user.userId??req.query.userId;
        const orders = await getUserPayments(userId);
        res.send(orders);
    }catch (error) {
        console.error(error);
        res.status(500).send({message: 'Error fetching orders'});
    }
});

module.exports = router;