const express = require('express');
const router = express.Router();
const { createPayment, createCustomer, addCard } = require('./controller');

const stripe = require("stripe")("sk_test_51P5QR3Iqj90TtX55z91nDeNdwkwNqgDntRABpqklGubEOnrtfEsR2M6YivU8ithiAG0EktidG1W2F50YYIVHG0LL00ste7Tm41", {
    apiVersion: "2022-08-01",
  });

router.post('/create-payment', createPayment);
router.post('/create-customer', createCustomer);
router.post('/add-card', addCard);

router.post("/create-payment-intent", async (req, res) => {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        currency: "EUR",
        amount: 1999,
        automatic_payment_methods: { enabled: true },
      });
  
      console.log(paymentIntent);
      console.log(paymentIntent.client_secret);
      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (e) {
      return res.status(400).send({
        error: {
          message: e.message,
        },
      });
    }
  });

module.exports = router;