const { Notification } = require('../../model');
const { Op } = require('sequelize');

class notificationModel {
    async insertNotification(notificationData) {
        try {
            const notification = await Notification.create(notificationData);
            return notification;
        } catch (error) {
            throw error;
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
            throw error;
        }
    }

    async getAllNotifications() {
        try {
            const notifications = await Notification.findAll();
            return notifications;
        } catch (error) {
            throw error;
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
            throw error;
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
            throw error;
        }
    }
}

module.exports = new notificationModel();