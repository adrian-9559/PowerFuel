import React, { useEffect, useState } from 'react';
import { Card, Chip } from '@nextui-org/react';
import OrderService from '@services/orderService';

const OrdersList = ({ userId }) => {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await OrderService.getUserOrders();
        const orders = response.data;
        setUserOrders(orders || []);
      } catch (error) {
        console.error(error);
        setUserOrders([]);
      }
    };
  
    fetchOrders();
  }, [userId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      {userOrders.map((order, index) => (
        <Card key={index} shadow className="p-6 rounded-md shadow-lg">
          <p className="font-bold text-lg">Importe: {order.amount/100} €</p>
          <Chip color={getStatusColor(order.status)} variant='flat'>{order.status}</Chip>
        </Card>
      )) || 'No tienes ningún pedido aún'}
    </div>
  );
};

export default OrdersList;