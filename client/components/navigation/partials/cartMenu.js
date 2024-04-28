import React, { useState, useEffect, use }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, Select, SelectItem, Image } from "@nextui-org/react";
import { setCart as setCartAction } from '../../../redux/cartSlice';
import productService from '../../../services/productService';
import { useRouter } from 'next/router';

const CartMenu = () => {
    const dispatch = useDispatch();
    const cartInfo = useSelector(state => state.cart);
    const router = useRouter();
    const [cart, setCart] = useState(cartInfo);

    useEffect(() => {
        setCart(cartInfo);
    }, [cartInfo]);

    useEffect(() => {
        handleViewCart();
    }, []);
    
    const handleViewCart = async () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(item => item.quantity >= 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        
        const updatedCart = await Promise.all(cart.map(async item => {
            try {
                const product = await productService.getProductById(item.id);
                return {...item, name: product.product_name, price: product.price};
    
            } catch (error) {
                console.error('Failed to fetch product:', error);
                return item;
            }
        }));
        
        dispatch(setCartAction(updatedCart));
        setCart(cartInfo);
    }
    
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
    
    return (
        <Dropdown>
            <Badge content={cart?cart.length:0}  color="primary">
                <DropdownTrigger>
                    <Button isIconOnly onClick={handleViewCart} >
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="11.25" viewBox="0 0 576 512">
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu
                aria-label="Cart Actions" 
                className="min-w-16 max-h-96 px-0.5 overflow-y-auto " 
                closeOnSelect={false}
            >
                {cart && cart.length > 0 &&
                    <DropdownItem key="cart" className="gap-2 sticky top-0 bg-white z-10 hover:bg-white" textValue='Cart'>
                        <section className='flex justify-between items-center '>
                            <p className="font-bold">Carrito</p>
                            <Button color="danger" variant="light" onClick={handleDeleteCart} isIconOnly isEnabled>
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </Button> 
                        </section>
                    </DropdownItem>                       
                }
                {cart && cart.length > 0 ? (
                    cart.map((item, index) => (
                            <DropdownItem
                                key={index} 
                                textValue={item.id} 
                                showDivider
                                onClick={() => router.push(`/product/${item.id}`)}
                            >
                                <section className='flex items-center mx-2 '>
                                    <section>
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            alt={item.product_name}
                                            className="object-cover h-20 my-1 z-1"
                                            src={`http://${process.env.NEXT_PUBLIC_AXIOS_HOST}:${process.env.NEXT_PUBLIC_AXIOS_PORT}/public/images/product/${item.id}/1.png`}
                                        /> 
                                    </section>
                                    <section className='mx-6'>
                                        <section className='items-center'>
                                            <p className='font-semibold' >{item.name}</p>
                                        </section>
                                        <section className='flex w-64 justify-between items-center'>
                                        {
                                        item.quantity > 9 ? (
                                            <section className='flex justify-center mb-4 space-x-2'>
                                                <Button isIconOnly onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                                                    </svg>
                                                </Button>
                                                <Input className={`min-w-8 max-w-${item.quantity.toString().length * 2 + 6} m-0`} value={item.quantity.toString()} readOnly/>
                                                <Button isIconOnly onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </Button>
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
                                        )
                                    }
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
                            </DropdownItem>
                    ))
                    ) : (
                        <DropdownItem key="empty" textValue="empty">
                            <p>Vacío</p>
                        </DropdownItem>
                    )}
                {cart && cart.length > 0 && (
                    <DropdownItem key="checkout" className='items-center bg-green-200 hover:bg-green-500 sticky bottom-0 z-10' color='success' textValue="checkout" onClick={() => router.push('/cart')}>
                        <section className='flex justify-between mx-2'>
                            <p>Revisar pedido:</p>
                            <p className='font-semibold'>{getTotalPrice()} €</p>
                        </section>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CartMenu;