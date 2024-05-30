const model = require('./notificationModel');

    insertNotification = async (notificationData) =>{
        return await model.insertNotification(notificationData);
    }

    getNotificationsByUser = async (userId, limit, page) => {
        return await model.getNotificationsByUser(userId , limit, page);
    }

    getAllNotifications = async () => {
        return await model.getAllNotifications();
    }

    markAsViewedUser = async (userId) => {
        return await model.markAsViewedUser(userId);
    }

    deleteNotification = async (notificationId) => {
        return await model.deleteNotification(notificationId);
    }

module.exports = {
    insertNotification,
    getNotificationsByUser,
    getAllNotifications,
    markAsViewedUser,
    deleteNotification
}