const {insertNotification} = require('../notifications/controller');
const OrderModel = require('./ordersModel');

    getOrdersByUser = async (userId) => {
        return await OrderModel.getOrdersByUser(userId);
    };

    getOrderById = async (orderId) => {
       return await OrderModel.getOrderById(orderId);
    };

    createOrder = async (orderData) => {
        try{
            const response = await OrderModel.createOrder(orderData);

            if(response.order_id != null){
                const notificationData = {
                    title: "Pedido creado",
                    description: "Se ha creado un nuevo pedido con el número de orden: " + response.order_id,
                    notification_date: new Date(),
                    viewed: "0",
                    reference: response.order_id,
                    notification_user: response.user_id,
                    type: "Order",

                };

                await insertNotification(notificationData);
            }

            return response;
        }catch(err){
            console.error(err);
        }
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