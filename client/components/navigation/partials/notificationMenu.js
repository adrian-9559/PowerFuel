import React, { useState } from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, Select, SelectItem, Image } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";

const NotificationMenu = () => {
    const [notifications, setNotifications] = useState([]);
    const { user, isAdmin, isLoggedIn ,setIsLoggedIn } = useAppContext();

    // Función para agregar una notificación
    const addNotification = (message) => {
        setNotifications([...notifications, message]);
    };

    // Función para eliminar una notificación
    const removeNotification = (index) => {
        const updatedNotifications = [...notifications];
        updatedNotifications.splice(index, 1);
        setNotifications(updatedNotifications);
    };

    return (
      <Dropdown>
        <Badge
          content={notifications ? notifications.length : 0}
          color="primary"
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
          className="min-w-16 max-h-96 px-0.5 overflow-y-auto "
          closeOnSelect={false}
        >
          <DropdownItem key="empty" textValue="empty">
            <p>Vacío</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );
};

export default NotificationMenu;