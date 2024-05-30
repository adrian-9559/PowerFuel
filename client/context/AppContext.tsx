// En tu archivo AppContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import NotificationService from '@services/notificationService';
import { useRouter } from 'next/router';

// Definir la forma de la información del usuario y del carrito
interface User {
  id: string;
  name: string;
  email: string;
}


interface CartItem {
  id: number;
  quantity: number;
}

interface NotificationItem {
  id: number;
}

// Crear el contexto con un valor predeterminado
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  user: null as User | null,
  setUser: (user: User | null) => {},
  cart: [] as CartItem[],
  setCart: (() => {}) as React.Dispatch<React.SetStateAction<CartItem[]>>,
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
  isCartOpen: false,
  onOpenCartChange: (value: boolean) => {},
  onOpenCart : () => {},
  notifications: [] as NotificationItem[],
  setNotifications: (() => {}) as React.Dispatch<React.SetStateAction<NotificationItem[]>>
});

// Crear el proveedor de contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isClient, setIsClient] = useState(false); 
  const [isCartOpen, setIsCartOpen] = useState(false);

  

  const onOpenCartChange = (value: boolean) => {
    setIsCartOpen(value);
  }

  const onOpenCart = () => {
    setIsCartOpen(true);
  };

  useEffect(() => {
    setIsClient(true); 
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const token = sessionStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  
  useEffect(() => {
    if (cart.length > 0 && isClient) { 
      localStorage.setItem('cart', JSON.stringify(cart));
    }

    if(cart.length === 0 && isClient) {
      localStorage.removeItem('cart');
    }

  }, [cart, isClient]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token && !user) {
        setIsLoggedIn(true);
        const fetchUserInfo = async () => {
            const userInfo = await UserService.getUserInfo();
            const roleResponse = await RoleService.getRoleByUserId();
            const notificationResponse = await NotificationService.getNotificationsByUser();
            setNotifications(notificationResponse);
            setUser(userInfo.data);
            setIsAdmin(roleResponse.data !== 10);
        };

        fetchUserInfo();
    } else {
        setIsLoggedIn(false);
        setUser(null);
        setIsAdmin(false);
    }

    // Actualizar las notificaciones cada 30 segundos
    const intervalId = setInterval(async () => {
        const notificationResponse = await NotificationService.getNotificationsByUser();
        setNotifications(notificationResponse);
    }, 30000);

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
}, []);

  return (
    <AppContext.Provider 
      value={
        {
          isLoggedIn,
          setIsLoggedIn,
          user, setUser,
          cart, setCart,
          isAdmin,
          setIsAdmin,
          isCartOpen,
          onOpenCartChange,
          onOpenCart,
          notifications,
          setNotifications
        }
      }
    >
      {children}
    </AppContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);