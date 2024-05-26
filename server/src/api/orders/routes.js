const express = require('express');

const { getUserOrders } = require('./controller'); 

const router = express.Router();

router.route('/user')
    .get(async (req, res) => {
        const customerId = req.user.userId;
        try {
            const orders = await getUserOrders(customerId);
            if (!orders) {
                return res.status(404).json({ message: 'Orders not found' });
            }
            return res.json(orders); 
        } catch (error) {
            console.error('Error getting the orders:', error);
            if (!res.headersSent) {
                return res.status(500).json({ message: 'Error getting the orders' });
            }
        }
    });

module.exports = router;