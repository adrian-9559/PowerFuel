const { Order } = require('../../model');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Orders)";

class OrderModel {
    /**
     * Función para obtener todas las órdenes de un usuario específico.
     * Function to get all orders from a specific user.
     * 
     * @param {string} userId - El ID del usuario cuyas órdenes se quieren obtener. | The ID of the user whose orders are to be obtained.
     * @returns {Promise<Object[]>} - Una promesa que se resuelve en un array de objetos de órdenes. | A promise that resolves into an array of order objects.
     * @throws {Error} - Lanza un error si hay un problema al obtener las órdenes del usuario. | Throws an error if there is a problem getting the user's orders.
     */
    getOrdersByUser = async (userId) => {
        try {
            return await Order.findAll({
                where: { user_id: userId }
            });
        } catch (error) {
            console.log(`Error al obtener los pedidos del usuario ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener una orden específica por su ID.
     * Function to get a specific order by its ID.
     * 
     * @param {string} orderId - El ID de la orden que se quiere obtener. | The ID of the order to be obtained.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden. | A promise that resolves into an order object.
     * @throws {Error} - Lanza un error si hay un problema al obtener la orden por ID. | Throws an error if there is a problem getting the order by ID.
     */
    getOrderById = async (orderId) => {
        try {
            return await Order.findOne({
                where: { order_id: orderId }
            });
        } catch (error) {
            console.log(`Error al obtener el pedido por ID ${errorDisplay}`, error);
        }
    };

    /**
     * Función para crear una nueva orden.
     * Function to create a new order.
     * 
     * @param {Object} orderData - Los datos de la nueva orden. | The data for the new order.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden. | A promise that resolves into an order object.
     * @throws {Error} - Lanza un error si hay un problema al crear la orden. | Throws an error if there is a problem creating the order.
     */
    createOrder = async (orderData) => {
        try {
            return await Order.create(orderData);
        } catch (error) {
            console.log(`Error al crear el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para actualizar una orden existente.
     * Function to update an existing order.
     * 
     * @param {string} orderId - El ID de la orden que se quiere actualizar. | The ID of the order to be updated.
     * @param {Object} orderData - Los nuevos datos de la orden. | The new data for the order.
     * @returns {Promise<Object>} - Una promesa que se resuelve en un objeto de orden actualizado. | A promise that resolves into an updated order object.
     * @throws {Error} - Lanza un error si hay un problema al actualizar la orden. | Throws an error if there is a problem updating the order.
     */
    updateOrder = async (orderId, orderData) => {
        try {
            return await Order.update(orderData, {
                where: { order_id: orderId }
            });
        } catch (error) {
            console.log(`Error al actualizar el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para eliminar una orden existente.
     * Function to delete an existing order.
     * 
     * @param {string} orderId - El ID de la orden que se quiere eliminar. | The ID of the order to be deleted.
     * @returns {Promise<boolean>} - Una promesa que se resuelve en un booleano que indica si la orden fue eliminada (true) o no (false). | A promise that resolves into a boolean indicating whether the order was deleted (true) or not (false).
     * @throws {Error} - Lanza un error si hay un problema al eliminar la orden. | Throws an error if there is a problem deleting the order.
     */
    deleteOrder = async (orderId) => {
        try {
            const result = await Order.destroy({
                where: { order_id: orderId }
            });
            return result > 0;
        } catch (error) {
            console.log(`Error al eliminar el pedido ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener el conteo total de órdenes.
     * Function to get the total count of orders.
     * 
     * @returns {Promise<number>} - Una promesa que se resuelve en el número total de órdenes. | A promise that resolves into the total number of orders.
     * @throws {Error} - Lanza un error si hay un problema al obtener el conteo de órdenes. | Throws an error if there is a problem getting the count of orders.
     */
    getOrdersCount = async () => {
        try {
            return await Order.count();
        } catch (error) {
            console.log(`Error al obtener el conteo de pedidos ${errorDisplay}`, error);
        }
    };

    /**
     * Función para obtener las órdenes entre dos fechas.
     * Function to get orders between two dates.
     * 
     * @param {string} startDate - La fecha de inicio del rango de búsqueda. | The start date of the search range.
     * @param {string} endDate - La fecha de fin del rango de búsqueda. | The end date of the search range.
     * @returns {Promise<Object[]>} - Una promesa que se resuelve en un array de objetos de órdenes ordenadas por fecha de forma ascendente. | A promise that resolves into an array of order objects sorted by date in ascending order.
     * @throws {Error} - Lanza un error si hay un problema al obtener las órdenes por fecha. | Throws an error if there is a problem getting orders by date.
     */
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
            console.log(`Error al obtener los pedidos por fecha ${errorDisplay}`, error);
        }
    };

    getAllOrders = async (skip = 0, limit = 10, orderId) => {
        try {
            skip = parseInt(skip);
            limit = parseInt(limit);
            const orders = await Order.findAll({
                where: orderId ? { order_id: orderId } : {},
                offset: skip,
                limit: limit,
                subQuery: false
            });
            return orders;
        } catch (error) {
            console.log(`Error al obtener los pedidos ${errorDisplay}`, error);
        }
    };

    getCountOrdersWeek = async (startDate, endDate) => {
        try{
            return await Order.count({
                where: {
                    order_date: {
                        [Op.between]: [startDate, endDate]
                    }
                }
            });
        }catch (error) {
            console.log(`Error al obtener el conteo de pedidos por semana ${errorDisplay}`, error);
        }
    }

    getCountStatusOrder = async (status) => {
        try{
            return await Order.count({
                where: {
                    order_status: status
                }
            });
        }catch (error) {
            console.log(`Error al obtener el conteo de pedidos por estado ${errorDisplay}`, error);
        }
    }
    
}

module.exports = new OrderModel();