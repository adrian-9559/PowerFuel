import React, { useState, useEffect, use } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, Select, SelectItem, Image } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import NotificationService from '@services/notificationService';
import { useRouter } from 'next/router';

const NotificationMenu = () => {
    const [unseenNotifications , setUnseenNotifications] = useState([]);
    const { notifications } = useAppContext();
    const router = useRouter();

    useEffect(() => {
      setUnseenNotifications(notifications.filter(notification => notification.viewed === "0"));
    }, [notifications])

    useEffect(() => {
      if(unseenNotifications.length > 0){
        NotificationService.markAsViewed();
      }
    }, [unseenNotifications])

    const handleOpen = () => {
      if(unseenNotifications.length > 0){
        NotificationService.markAsViewed();
        setUnseenNotifications([]);
      }
    }

    return (
      <Dropdown onOpen={handleOpen}>
        <Badge
          content={unseenNotifications?.length || null}
          color="primary"
          isInvisible={unseenNotifications?.length === 0}
        >
          <DropdownTrigger>
            <Button isIconOnly>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10"
                width="8.75"
                viewBox="0 0 448 512"
              >
                <path
                  fill="#000000"
                  d="M224 0c-17.7 0-32 14.3-32 32V51.2C119 66 64 130.6 64 208v18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416H416c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8V208c0-77.4-55-142-128-156.8V32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
                />
              </svg>
            </Button>
          </DropdownTrigger>
        </Badge>
        <DropdownMenu
          aria-label="Cart Actions"
          className="min-w-16 max-h-48 overflow-y-auto pb-8"
          closeOnSelect={false}
        >
          {notifications.map((notification, index) => (
            <DropdownItem key={index} textValue={notification.title}>
              <p>{notification.title}</p>
            </DropdownItem>
          ))}
            {notifications.length > 0 && (
              <DropdownItem key="viewAll" textValue="Ver más" className='fixed h-auto w-[92%] p-0 bottom-2'>
              <Button color="primary" className='w-full h-6' onPress={() => router.push('/users/config/NotificationList')}>
                Ver más
              </Button>
            </DropdownItem>
            )
          }
        </DropdownMenu>
      </Dropdown>
    );
};

export default NotificationMenu;