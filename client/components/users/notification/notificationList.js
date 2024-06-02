import React, { useState, useEffect } from 'react';
import { Card, CardBody, Chip, Button } from '@nextui-org/react';
import NotificationService from '@services/notificationService';


const NotificationList = () => {
    const [loading, setLoading] = useState(true);
    const [notifications, setNotifications] = useState([]);

    const getStatusColor = (type) => {
        switch (type) {
          case 'Order':
            return 'success';
          case 'Warning':
            return 'warning';
          default:
            return 'default';
        }
    };

    function getCardColor(viewed) {
        switch (viewed) {
            case "1":
                return 'bg-gray-200';
            case "0":
                return 'bg-blue-500';
            default:
                return 'bg-red-200';
        }
    }

    useEffect(() => {
        
         fetchNotifications();

    }, [loading]);

    const fetchNotifications = async () => {
        try {
            const notifications = await NotificationService.getNotificationsByUser();
            setNotifications(notifications);
            console.log(notifications, " notificaciones")
            setLoading(false);
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
        <section className="py-5 flex flex-col gap-4">
            <section>
                <h1 className="font-bold text-3xl">Notificaciones</h1>
            </section>
            <section className='w-full h-full flex flex-col gap-4'>
                {notifications.map((notification) => (
                    <Card key={notification.notification_id} className={`${getCardColor(notification.viewed)} bg-opacity-20`}>
                        <CardBody>
                            <section className='flex w-full justify-between'>
                                <section className='w-full'>
                                    <section>
                                        <h3 className='text-2xl font-bold m-3'>{notification.title}</h3>
                                        <section className='mx-4 grid'>
                                            <section className='font-bold'>Descripción:</section>
                                            <section>{notification.description}</section>
                                        </section>
                                        <section className='mx-4 my-1 grid'>
                                            <section>
                                                <section className='font-bold'>Fecha:</section>
                                                <section>{new Date(notification.notification_date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</section>
                                            </section>
                                        </section>
                                    </section>
                                </section>
                                <section className='grid justify-end m-4 w-fit'>
                                    <section className='flex justify-end'>
                                        <Chip color={getStatusColor(notification.type)}>{notification.type}</Chip>
                                    </section>
                                    <section className='flex justify-end items-end h-full'>
                                        <Button
                                            onClick={() => deleteNotification(notification.notification_id)}
                                            color='danger'
                                        >
                                            Eliminar
                                        </Button>
                                    </section>
                                </section>
                            </section>
                        </CardBody>
                    </Card>
                ))}
                {notifications.length <= 0 && (
                    <p>No hay notificaciones</p>
                )}
            </section>
        </section>
    );
};

export default NotificationList;