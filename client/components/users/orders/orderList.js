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
    });
    
    return (
        <main className="py-5">
            <section>
                <h1 className="font-bold text-3xl">Listado de Direcciones</h1>
            </section>
            <section>
                <ul>
                    {orderList && orderList.map((order, index) => (
                        <OrderItem key={index} order={order}/>
                    ))} 
                    {!orderList && <p>No hay direcciones de envío</p>}
                </ul>
            </section>
        </main>
    );
}

export default AddressList;