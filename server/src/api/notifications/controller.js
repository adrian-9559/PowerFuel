const model = require('./notificationModel');
const errorDisplay = "(Error en el controlador de Notifications)";

insertNotification = async (notificationData) => {
    try {
        return await model.insertNotification(notificationData);
    } catch (error) {
        throw new Error(`Error al intentar insertar la notificación ${errorDisplay}`, error);
    }
};

getNotificationsByUser = async (userId, limit, page) => {
    try {
        return await model.getNotificationsByUser(userId , limit, page);
    } catch (error) {
        throw new Error(`Error al intentar obtener las notificaciones por usuario ${errorDisplay}`, error);
    }
};

getAllNotifications = async () => {
    try {
        return await model.getAllNotifications();
    } catch (error) {
        throw new Error(`Error al intentar obtener todas las notificaciones ${errorDisplay}`, error);
    }
};

markAsViewedUser = async (userId) => {
    try {
        return await model.markAsViewedUser(userId);
    } catch (error) {
        throw new Error(`Error al intentar marcar al usuario como visto ${errorDisplay}`, error);
    }
};

deleteNotification = async (notificationId) => {
    try {
        return await model.deleteNotification(notificationId);
    } catch (error) {
        throw new Error(`Error al intentar eliminar la notificación ${errorDisplay}`, error);
    }
};

module.exports = {
    insertNotification,
    getNotificationsByUser,
    getAllNotifications,
    markAsViewedUser,
    deleteNotification
}