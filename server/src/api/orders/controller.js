const {insertNotification} = require('../notifications/controller');
const OrderModel = require('./ordersModel');
const errorDisplay = "(Error en el controlador de Orders)";

getOrdersByUser = async (userId) => {
    try {
        return await OrderModel.getOrdersByUser(userId);
    } catch (error) {
        throw new Error(`Error al intentar obtener los pedidos del usuario ${errorDisplay}`, error);
    }
};

getOrderById = async (orderId) => {
    try {
        return await OrderModel.getOrderById(orderId);
    } catch (error) {
        throw new Error(`Error al intentar obtener el pedido por ID ${errorDisplay}`, error);
    }
};

createOrder = async (orderData) => {
    try {
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
    } catch(err) {
        throw new Error(`Error al intentar crear el pedido ${errorDisplay}`, err);
    }
};

updateOrder = async (orderId, orderData) => {
    try {
        return await OrderModel.updateOrder(orderId, orderData);
    } catch (error) {
        throw new Error(`Error al intentar actualizar el pedido ${errorDisplay}`, error);
    }
};

deleteOrder = async (orderId) => {
    try {
        return await OrderModel.deleteOrder(orderId);
    } catch (error) {
        throw new Error(`Error al intentar eliminar el pedido ${errorDisplay}`, error);
    }
};

getOrdersCount = async () => {
    try {
        return await OrderModel.getOrdersCount();
    } catch (error) {
        throw new Error(`Error al intentar obtener el conteo de pedidos ${errorDisplay}`, error);
    }
};

getOrdersByDate = async (startDate, endDate) => {
    try {
        return await OrderModel.getOrdersByDate(startDate, endDate);
    } catch (error) {
        throw new Error(`Error al intentar obtener los pedidos por fecha ${errorDisplay}`, error);
    }
};

    module.exports = {
        getOrdersByUser,
        getOrderById,
        createOrder,
        updateOrder,
        deleteOrder,
        getOrdersCount,
        getOrdersByDate
    };