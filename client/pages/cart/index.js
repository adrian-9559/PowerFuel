import { useEffect, useState } from 'react';
import { Button, Image, Input, Select, SelectItem, Modal, useDisclosure } from "@nextui-org/react";
import { useRouter } from 'next/router';
import ProductService from '@services/productService';
import AddressService from '@services/addressService';
import DefaultLayout from '@layouts/default';
import { useAppContext } from '@context/AppContext';
import CheckOut from '../../components/cart/';
import CartItem from '@components/cart/cartItem';

const ViewCart = () => {
    const { cart, setCart } = useAppContext();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const router = useRouter();

    const handleViewCart = async () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.quantity >= 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        const updatedCart = await Promise.all(cart.map(async item => {
            try {
                const product = await ProductService.getProductById(item.id);
                return {...item, name: product.product_name, price: product.price};
            } catch (error) {
                console.error('Failed to fetch product:', error);
                return item;
            }
        }));
        
        setCart(updatedCart);
    }

    const handleDeleteCart = () => {
        setCart([]);
    }

    const handleQuantityChange = (id, quantity) => {
        let cartAux = cart
    
        cartAux = cartAux.map(item => item.product_id === id ? {...item, quantity: parseInt(quantity)} : item);
    
        setCart(cartAux);
    }
    
    const handleDeleteCartProduct = (id) => {
        let cartAux = cart
        cartAux = cartAux.filter(item => item.product_id !== id);


        setCart(cartAux);
    };

    function getTotalPrice() {
        let total = 0;

        if(cart.length > 0) {
            for (let item of cart) {
                total += item.price * item.quantity;
            }
        }

        total = total.toFixed(2);
        return total;
    }

    return (
        <DefaultLayout>
            <main className='flex flex-col items-center justify-center p-4'>
                <section className='w-full max-w-4xl p-8 bg-white rounded-lg shadow-md grid flex-col md:flex-row'>
                    <section className='flex h-10 flex-row justify-center items-center bg-gray-300 mb-2 rounded-lg'>
                        <p className="font-bold">Carrito</p>
                        {cart && cart.length > 0 &&
                            <Button color="danger" className='h-8' variant="light" onClick={handleDeleteCart} isIconOnly isEnabled>
                                <svg xmlns="http://www.w3.org/2000/svg" height="10" width="8.75" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </Button>                            
                        }
                    </section>
                    <section className="w-full flex flex-row justify-center">
                        {cart && cart.length > 0 ? cart.map((item, index) => <CartItem key={index} item={item} />) : <p>Vacío</p>}
                    </section>
                    {cart && cart.length > 0 && (
                        <section className='flex justify-between mx-2'>
                            <CheckOut />
                            <p className='font-semibold'>{getTotalPrice()} €</p>
                        </section>
                    )}
                </section>
            </main>
        </DefaultLayout>
    );
};

export default ViewCart;