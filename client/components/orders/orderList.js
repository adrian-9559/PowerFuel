import React, { useEffect, useState } from 'react';
import { Card, Chip } from '@nextui-org/react';
import OrderService from '@services/orderService';
import OrderItem from './orderItem';

const OrdersList = ({ userId }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getUserOrders();
        setUserOrders(response || []);
      } catch (error) {
        console.error(error);
        setUserOrders([]);
      }
    };
  
    fetchOrders();
  }, [userId]);

  return (
    <div className="flex flex-col space-y-4">
      {userOrders.map((order, index) => (
        <OrderItem order={order}/>
      )) || 'No tienes ningún pedido aún'}
    </div>
  );
};

export default OrdersList;