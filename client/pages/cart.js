import { useEffect, useState } from 'react';
import { getProductById } from '../services/productService';
import { Button, Image, Input, Select, SelectItem } from "@nextui-org/react";
import DefaultLayout from '../layouts/default';
import useRouter from 'next/router';


const ViewCart = () => {
    const router = useRouter;
    const [cart, setCart] = useState();

    const handleViewCart = async () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.quantity >= 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        const updatedCart = await Promise.all(cart.map(async item => {
            try {
                const product = await getProductById(item.id);
                return {...item, name: product.product_name, price: product.price};
            } catch (error) {
                console.error('Failed to fetch product:', error);
                return item;
            }
        }));
        
        setCart(updatedCart);
    }

    useEffect(() => {
        handleViewCart();
    } ,[]);

    const handleDeleteCart = () => {
        localStorage.removeItem('cart');
        setCart([]);
    }

    const handleQuantityChange = (id, quantity) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
        cart = cart.map(item => item.id === id ? {...item, quantity: parseInt(quantity)} : item);
    
        localStorage.setItem('cart', JSON.stringify(cart));
        handleViewCart();
    }
    
    const handleDeleteCartProduct = (id) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(cart));
        setCart(cart);
        handleViewCart();
    }

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

    const QuantityButton = ({ onClick, children }) => (
        <Button isIconOnly onClick={onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                {children}
            </svg>
        </Button>
    );

    const CartItem = ({ item }) => (
        <section className='flex flex-row justify-center items-center w-full hover:bg-gray-100' onClick={() => router.push(`/product/${item.id}`)}>
            <section>
                <Image
                    shadow="sm"
                    radius="lg"
                    alt={item.product_name}
                    className="object-cover h-20 my-1"
                    src={`http://25.65.210.24:4001/public/images/product/${item.id}/1.png`}
                /> 
            </section>
            <section className='mx-6'>
                <section className='items-center'>
                    <p className='font-semibold'>{item.name}</p>
                </section>
                <section className='flex justify-between items-center'>
                    {item.quantity > 9 ? (
                        <section className='flex justify-center mb-4 space-x-2'>
                            <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                            </QuantityButton>
                            <Input className={`min-w-8 max-w-${item.quantity.toString().length * 2 + 6} m-0`} value={item.quantity.toString()} readOnly/>
                            <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </QuantityButton>
                        </section>
                    ) : (
                        <Select
                            className='w-1/3 my-1 text-center'
                            onChange={(e) => handleQuantityChange(item.id, e.target.value)} 
                            aria-label="Quantity Select"
                            selectedKeys={item.quantity.toString()}
                        >
                            {[...Array(9).keys()].map((i) => <SelectItem key={(i+1).toString()} value={(i+1).toString()} textValue={(i+1).toString()}>{i+1}</SelectItem>)}
                            <SelectItem key="10" value="10" textValue="10">+10</SelectItem>
                        </Select>
                    )}
                    <p>{(item.price * item.quantity??0).toFixed(2)} €</p>
                </section>
            </section>
            <section className='items-center'>
                <Button
                    color="danger"
                    variant="light"
                    onClick={(event) => {
                        event.stopPropagation();
                        handleDeleteCartProduct(item.id, event);
                    }}
                    className=''
                    isIconOnly
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </Button>
            </section>
        </section>
    );

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
                        <Button className='items-center bg-green-200 hover:bg-green-500 mt-5 w-full' color='success'onClick={() => router.push('/')}>
                            <section className='flex justify-between mx-2'>
                                <p>Pagar:</p>
                                <p className='font-semibold'>{getTotalPrice()} €</p>
                            </section>
                        </Button>
                    )}
                </section>
            </main>
        </DefaultLayout>
    );
};

export default ViewCart;
