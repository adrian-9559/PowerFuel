import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import PaymentService from '@services/paymentService';
import OrderService from '@services/orderService';
import AddressService from '@services/addressService';
import {useAppContext} from '@context/AppContext';
import PartyIcon from '@icons/PartyIcon';
import { Card, Button } from '@nextui-org/react';

const SuccessPage = () => {
    const router = useRouter();
    const success = router.query.success;
    const {cart, setCart} = useAppContext();

    useEffect(() => {
        const handleSuccess = async () => {
            if (success) {
                const addressId = localStorage.getItem('shipping_address');
                let shipping = null;
                if (addressId) 
                    shipping = await AddressService.getAddressById(addressId);
                else
                    shipping = await AddressService.getDefaultAddress();
    
                const lastPayment = await PaymentService.getLastPayment();
                const order = {
                    order_id: lastPayment.id,
                    order_date: new Date(),
                    order_status: 'pending',
                    details: JSON.stringify(cart),
                    shipping_address: JSON.stringify(shipping), 
                };
        
                await OrderService.createOrder(order);
        
                setCart([]);
            }
        }
        handleSuccess();
    }, [success]);

    return (
        <div className='flex justify-center items-center h-full'>
            <Card className='shadow-md px-8 pt-6 pb-8 mb-4 items-center justify-center'>
                <section className='mb-4 text-center'>
                    <h1 className='font-bold text-xl mb-2'>¡Pedido completado con éxito!</h1> 
                    <PartyIcon className="w-16 h-16 mx-auto"/>
                </section>
                <p className='mb-6 text-center w-96'>Gracias por tu compra. Tu pedido está siendo procesado y te llegará pronto.</p>
                <section className='flex flex-col justify-center items-center gap-2 w-full'>
                    <Button color='primary' block onPress={() => router.push('/')} className='w-64'>Seguir comprando</Button>
                    <Button color='primary' block onPress={() => router.push('/users/config/OrderList')} className='w-64'>Ver mis pedidos</Button>
                </section>
            </Card>
        </div>
    );
};

export default SuccessPage;