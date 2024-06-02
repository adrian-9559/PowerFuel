const { Order } = require('../../model');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Orders)";

class OrderModel {
    getOrdersByUser = async (userId) => {
        try {
            return await Order.findAll({
                where: { user_id: userId }
            });
        } catch (error) {
            throw new Error(`Error al obtener los pedidos del usuario ${errorDisplay}`, error);
        }
    };

    getOrderById = async (orderId) => {
        try {
            return await Order.findOne({
                where: { order_id: orderId }
            });
        } catch (error) {
            throw new Error(`Error al obtener el pedido por ID ${errorDisplay}`, error);
        }
    };

    createOrder = async (orderData) => {
        try {
            return await Order.create(orderData);
        } catch (error) {
            throw new Error(`Error al crear el pedido ${errorDisplay}`, error);
        }
    };


    updateOrder = async (orderId, orderData) => {
        try {
            return await Order.update(orderData, {
                where: { order_id: orderId }
            });
        } catch (error) {
            throw new Error(`Error al actualizar el pedido ${errorDisplay}`, error);
        }
    };

    deleteOrder = async (orderId) => {
        try {
            const result = await Order.destroy({
                where: { order_id: orderId }
            });
            return result > 0;
        } catch (error) {
            throw new Error(`Error al eliminar el pedido ${errorDisplay}`, error);
        }
    };

    getOrdersCount = async () => {
        try {
            return await Order.count();
        } catch (error) {
            throw new Error(`Error al obtener el conteo de pedidos ${errorDisplay}`, error);
        }
    };

    getOrdersByDate = async (startDate, endDate) => {
        try {
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
        } catch (error) {
            throw new Error(`Error al obtener los pedidos por fecha ${errorDisplay}`, error);
        }
    };
}

module.exports = new OrderModel();