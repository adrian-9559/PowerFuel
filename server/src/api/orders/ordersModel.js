const { Order } = require('../../model');
const { Op } = require('sequelize');

class OrderModel {
    getOrdersByUser = async (userId) => {
        return await Order.findAll({
            where: { user_id: userId }
        });
    };

    getOrderById = async (orderId) => {
        return await Order.findOne({
            where: { order_id: orderId }
        });
    };

    createOrder = async (orderData) => {
        return await Order.create(orderData);
    };

    updateOrder = async (orderId, orderData) => {
        return await Order.update(orderData, {
            where: { order_id: orderId }
        });
    };

    deleteOrder = async (orderId) => {
        const result = await Order.destroy({
            where: { order_id: orderId }
        });
        return result > 0;
    };

    getOrdersCount = async () => {
        return await Order.count();
    };

    getOrdersByDate = async (startDate, endDate) => {
        let whereCondition = {};
        if(startDate && endDate && !isNaN(new Date(startDate)) && !isNaN(new Date(endDate))) {
            whereCondition.order_date = {
                [Op.between]: [startDate, endDate]
            };
        }
    
        let orders = await Order.findAll({
            where: whereCondition,
            order: [
                ['order_date', 'ASC']
            ]
        });
        
        return orders;
    };
}

module.exports = new OrderModel();