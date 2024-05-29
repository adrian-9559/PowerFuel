const express = require('express');
const {getOrdersByDate, getOrdersByUser, getOrderById, createOrder, updateOrder, deleteOrder, getOrdersCount} = require('./controller');

const router = express.Router();

router.route('/user/:userId')
    .get(async (req, res) => {
        try {
            const userId = req.params.userId;
            const orders = await getOrdersByUser(userId);
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener las órdenes. Por favor, inténtalo de nuevo.' });
        }
    });

    router.route('/user')
    .get(async (req, res) => {
        try {
            const userId = req.user.userId;
            const orders = await getOrdersByUser(userId);
            res.json(orders);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener las órdenes. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/:orderId')
    .get(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = await getOrderById(orderId);
            res.json(order);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener la orden. Por favor, inténtalo de nuevo.' });
        }
    })
    .put(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const order = req.body;
            const updatedOrder = await updateOrder(orderId, order);
            res.json(updatedOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al actualizar la orden. Por favor, inténtalo de nuevo.' });
        }
    })
    .delete(async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const result = await deleteOrder(orderId);
            res.json({ success: result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al eliminar la orden. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/')
    .post(async (req, res) => {
        try {
            const order = req.body;
            order.user_id = req.user.userId;
            const newOrder = await createOrder(order);
            res.json(newOrder);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al crear la orden. Por favor, inténtalo de nuevo.' });
        }
    })
    .get(async (req, res) => {
        try {
            const count = await getOrdersCount();
            res.json({ count });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener el conteo de órdenes. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/date')
    .get(async (req, res) => {
        try {
            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            const orders = await getOrdersByDate(startDate, endDate);
            res.json(orders);
        } catch (error) {
            res.status(500).json({ message: 'Hubo un problema al obtener las órdenes. Por favor, inténtalo de nuevo.' });
        }
    });

module.exports = router;