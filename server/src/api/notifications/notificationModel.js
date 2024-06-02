const { Notification } = require('../../model');
const { Op } = require('sequelize');
const errorDisplay = "(Error en el modelo de Notifications)";

class notificationModel {
    async insertNotification(notificationData) {
        try {
            const notification = await Notification.create(notificationData);
            return notification;
        } catch (error) {
            throw new Error(`Error al insertar la notificación ${errorDisplay}`, error);
        }
    }

    async getNotificationsByUser(userId , limit, page) {
        try {
            const notifications = await Notification.findAll({
                where: {
                    notification_user: userId
                },
                limit,
                offset: (page - 1) * limit,
                order: [['notification_date', 'DESC']]
            });
            return notifications;
        } catch (error) {
            throw new Error(`Error al obtener las notificaciones del usuario ${errorDisplay}`, error);
        }
    }

    async getAllNotifications() {
        try {
            const notifications = await Notification.findAll();
            return notifications;
        } catch (error) {
            throw new Error(`Error al obtener todas las notificaciones ${errorDisplay}`, error);
        }
    }

    async markAsViewedUser(userId) {
        try {
            const result = await Notification.update({ viewed: true }, {
                where: {
                    notification_user: userId
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Error al marcar las notificaciones como vistas ${errorDisplay}`, error);
        }
    }

    async deleteNotification(notificationId) {
        try {
            const result = await Notification.destroy({
                where: {
                    notification_id: notificationId
                }
            });
            return result;
        } catch (error) {
            throw new Error(`Error al eliminar la notificación ${errorDisplay}`, error);
        }
    }
}

module.exports = new notificationModel();