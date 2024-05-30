import React, { useState, useEffect } from 'react';
import { Card, CardBody, Image, Spinner, Button } from '@nextui-org/react';
import NotificationService from '@services/notificationService';

const NotificationList = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        
         fetchNotifications();

    }, [loading]);

    const fetchNotifications = async () => {
        try {
            const notifications = await NotificationService.getNotificationsByUser();
            setNotifications(notifications);
            setLoading(false);
            console.log('Notificaciones obtenidas:', notifications);
        } catch (error) {
            console.error('Error al obtener las notificaciones:', error);
        }
    }

    const deleteNotification = async (notificationId) => {
        try {
            NotificationService.deleteNotificationById(notificationId);
            setLoading(true);
        } catch (error) {
            console.error('Error al eliminar la notificación:', error);
        }
    }

    return (
        <section>
            <section>
                <h1>Notificaciones</h1>
            </section>
            <section>
                <Card>
                    <CardBody>
                        {notifications.map((notification, index) => (
                            <Card key={notification.notification_id}>
                                <CardBody>
                                    <p>{notification.title}</p>
                                    <p>{notification.description}</p>
                                    <p>{notification.notification_date}</p>
                                    <Button
                                        onClick={() => deleteNotification(notification.notification_id)}
                                    >
                                        Eliminar
                                    </Button>
                                </CardBody>
                            </Card>
                        ))}
                        {notifications.length <= 0 && (
                            <p>No hay notificaciones</p>
                        )}
                    </CardBody>
                </Card>
            </section>
        </section>
    );
};

export default NotificationList;