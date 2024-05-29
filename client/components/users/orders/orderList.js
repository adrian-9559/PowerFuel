import React, { useState, useEffect } from 'react';
import OrderService from '@services/orderService';
import OrderItem from './orderItem';

const AddressList = () => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetchAddress = async () => {
            const orderData = await OrderService.getUserOrders() 
            setOrderList(orderData);
        };
        
        fetchAddress();
        console.log("orderList", orderList);
    });

    

    return (
        <main className="py-5">
            <h1 className="font-bold text-3xl">Lista de pedidos</h1>
            <ul>
                {orderList && orderList.map((oder, index) => (
                    <OrderItem key={index} order={oder} />
                ))} 
                {!orderList && <p>No hay direcciones de envío</p>}
            </ul>
        </main>
    );
}

export default AddressList;