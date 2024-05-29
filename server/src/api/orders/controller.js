const OrderModel = require('./ordersModel');

    getOrdersByUser = async (userId) => {
        return await OrderModel.getOrdersByUser(userId);
    };

    getOrderById = async (orderId) => {
       return await OrderModel.getOrderById(orderId);
    };

    createOrder = async (orderData) => {
        
        return await OrderModel.createOrder(orderData);
    };

    updateOrder = async (orderId, orderData) => {
       
        return await OrderModel.updateOrder(orderId, orderData);
    };

    deleteOrder = async (orderId) => {
        
        return await OrderModel.deleteOrder(orderId);
    };

    getOrdersCount = async () => {
        
        return await OrderModel.getOrdersCount();
    };

    getOrdersByDate = async (startDate, endDate) => {
        return await OrderModel.getOrdersByDate(startDate, endDate);
    }

    module.exports = {
        getOrdersByUser,
        getOrderById,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrdersCount,
        getOrdersByDate
    };