// routes.ts
const express = require('express');
const { getCustomer, getCustomerCharges } = require('./controller');

const router = express.Router();

router.get('/get-customer', async (req, res) => {
    const userId = req.user.userId??req.query.userId;
    const customer = await getCustomer(userId);
    res.send(customer);
});


module.exports = router;