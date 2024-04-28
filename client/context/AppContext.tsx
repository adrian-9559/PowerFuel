// En tu archivo AppContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useRouter } from 'next/router';

// Definir la forma de la información del usuario y del carrito
interface User {
  id: string;
  name: string;
  email: string;
}

interface CartItem {
  id: string;
  quantity: number;
  // ...otros campos que necesites
}

// Crear el contexto con un valor predeterminado
const AppContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => {},
  user: null as User | null,
  setUser: (user: User | null) => {},
  cart: [] as CartItem[],
  setCart: (cart: CartItem[]) => {},
  isAdmin: false,
  setIsAdmin: (value: boolean) => {},
  router: null as any,
});

// Crear el proveedor de contexto
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }
  }, []);
  
  useEffect(() => {
    if (cart.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchUserInfo = async () => {
        const userInfo = await UserService.getUserInfo();
        const userRole = await RoleService.getUserRole();
        setUser(userInfo);
        setIsAdmin(userRole !== 10);
      };
  
      fetchUserInfo();
    }
  }, [isLoggedIn]);

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, cart, setCart, isAdmin, setIsAdmin }}>
      {children}
    </AppContext.Provider>
  );
};

// Crear un hook personalizado para usar el contexto
export const useAppContext = () => useContext(AppContext);