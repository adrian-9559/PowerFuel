import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from "@nextui-org/react";
import {Divider} from "@nextui-org/react";
import ProductService from '@services/productService';
import AddressService from '@services/addressService';
import { useAppContext } from '@context/AppContext';
import CheckOut from '@components/cart/checkout';
import CartItemPageComponent from '@components/cart/cartItemPage';
import DeleteIcon from '@icons/DeleteIcon';

const ViewCart = () => {
    const { cart, setCart } = useAppContext();
    // const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [total, setTotal] = useState(0);
    const router = useRouter();

    const handleDeleteCart = () => {
        setCart([]);
    }

    const handleQuantityChange = (id, quantity) => {
        cart.map(item => item.product_id === id ? {...item, quantity: parseInt(quantity)} : item);
        setCart(cart);
    }
    
    const handleDeleteCartProduct = (id) => {
        setCart(cart.filter(item => item.product_id !== id));
    };

    useEffect(() => {
        async function getTotalPrice() {
            let total = 0;
            for (const item of cart) {
                try {
                    const productData = await ProductService.getProductById(item.product_id);
                    if (productData) {
                        total += productData.price * item.quantity;
                    }
                } catch (error) {
                    console.error('Error fetching product:', error.message);
                }
            }
            setTotal(parseFloat(total.toFixed(2)));
        }
    
        getTotalPrice();
    }, [cart]);

    return (
        <main className="px-12 py-6 w-full grid gap-10">
            <section className="flex justify-center">
                <h1 className="text-5xl font-bold">Carrito</h1>
            </section>
            <section className='flex flex-row gap-8'>
                <section className="bg-gray-200 bg-opacity-25 w-2/3 flex flex-col p-8 gap-3 relative rounded-large border-3">
                    <section className='flex w-full justify-between px-16'>
                        <h2 className="text-2xl font-bold">Productos</h2>
                        <Button
                            isIconOnly
                            className="text-2xl bg-red-500 bg-opacity-25 hover:bg-opacity-300"
                            radius="full"
                            onClick={handleDeleteCart}
                        >
                            <DeleteIcon
                                color="red"
                            />
                        </Button>
                    </section>
                    <Divider />
                    <section className='w-auto px-16 grid gap-5'>
                        {cart && cart.length > 0 ? cart.map((item, index) => 
                            <CartItemPageComponent key={index} item={item} />
                        ) : <p>Vacío</p>}    
                    </section>
                </section>
                <Divider orientation="vertical" />
                <section className="w-1/3 h-fit bg-amber-200 bg-opacity-25 rounded-large border-3">
                    <section className='w-full p-10 flex flex-col justify-center gap-6'>
                        <h2 className="text-2xl font-bold flex justify-center">Resumen</h2>
                        <section>
                            <Divider />
                            <section className='flex justify-between px-10'>
                                <p>Subtotal</p>
                                <p>{total.toFixed(2)} €</p>
                            </section>
                            <Divider />
                            <section className='flex justify-between px-10'>
                                <p>Envío</p>
                                <p>Gratis</p>
                            </section>
                            <Divider />
                            <section className='flex justify-between px-10'>
                                <p>Impuestos</p>
                                <p>21 %</p>
                            </section>
                        </section>
                        <section>
                            <Divider />
                            <section className='flex justify-between px-10'>
                                <p>Total</p>
                                <p>{(total + (total * 0.21)).toFixed(2)} €</p>
                            </section>
                        </section>
                    </section>
                    {cart && cart.length > 0 && (
                        <section className='flex w-full px-10 pb-8'>
                            <CheckOut/>
                        </section>
                    )}  
                </section>
            </section>
        </main>
    );
};

export default ViewCart;
