import React, { useEffect, useState } from 'react';
import { Card, Chip } from '@nextui-org/react';
import { useAppContext } from '@context/AppContext';
import OrderService from '@services/orderService';
import OrderItem from './orderItem';

const OrdersList = () => {
  const [userOrders, setUserOrders] = useState([]);
  const { user, isLoggedIn } = useAppContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getUserOrders();
        setUserOrders(response || []);
      } catch (error) {
        setUserOrders([]);
      }
    };
  
    fetchOrders();
  }, [user, isLoggedIn]);

  return (
    <div className="flex flex-col space-y-4">
      {userOrders.map((order, index) => (
        <OrderItem order={order} key={order.order_id}/>
      )) || 'No tienes ningún pedido aún'}
    </div>
  );
};

export default OrdersList;