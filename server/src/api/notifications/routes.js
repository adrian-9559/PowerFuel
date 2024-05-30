const express = require('express');
const {getAllNotifications, getNotificationsByUser, insertNotification ,markAsViewedUser, deleteNotification} = require('./controller');

const router = express.Router();

router.route('/user')
    .get(async (req, res) => {
        try {
            const { userId } = req.user;
            const { limit = 10, page = 1 } = req.query;
            const notifications = await getNotificationsByUser(userId, parseInt(limit), parseInt(page));
            res.json(notifications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener las notificaciones. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/:notificationId')
    .delete(async (req, res) => {
        try {
            const { notificationId } = req.params;
            console.log('notificationId:', notificationId);
            await deleteNotification(notificationId);
            res.json({ message: 'La notificación ha sido eliminada correctamente.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al eliminar la notificación. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/')
    .post(async (req, res) => {
        try {
            const notificationData = req.body;
            const newNotification = await insertNotification(notificationData);
            res.json(newNotification);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al crear la notificación. Por favor, inténtalo de nuevo.' });
        }
    })
    .get(async (req, res) => {
        try {
            const notifications = await getAllNotifications();
            res.json(notifications);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al obtener las notificaciones. Por favor, inténtalo de nuevo.' });
        }
    });

router.route('/viewed')
    .put(async (req, res) => {
        try {
            const userId = req.user.userId;
            await markAsViewedUser(userId);
            res.json({ message: 'Todas las notificaciones han sido marcadas como vistas.' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Hubo un problema al marcar las notificaciones como vistas. Por favor, inténtalo de nuevo.' });
        }
    });

module.exports = router;