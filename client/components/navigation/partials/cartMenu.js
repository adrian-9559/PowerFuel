import React, { useState, useEffect, useCallback }from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, useDisclosure, user, ScrollShadow } from "@nextui-org/react";
import CartItem from '@components/cart/cartItem';
import { useRouter } from 'next/router';
import { useAppContext } from "@context/AppContext";
import { AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';
import { useCart } from '@hooks/useCart';
import DeleteIcon from '@icons/DeleteIcon';


const CartMenu = () => {
    const { cart, isCartOpen ,onOpenCartChange, onOpenCart } = useAppContext();
    const [total, setTotal] = useState(0);
    const router = useRouter();
    const { emptyCart, getTotal } = useCart()

   

    const handleReviewOrder = () => {
        onOpenCartChange(false);
        router.push('/cart')
    }

    useEffect(() => {
        const fetchTotal = async () => {
            const total = await getTotal();
            setTotal(total);
        };
        fetchTotal();
    }, [cart, getTotal])
    
    return (
        <Dropdown
            isOpen={isCartOpen}
            onOpenChange={onOpenCartChange}
            showArrow 
        >
        <Badge content={
                cart?cart.length:0
            }  
            color="primary" 
            isInvisible={cart && cart.length === 0}
            >
                <DropdownTrigger>
                    <Button
                        isIconOnly
                        onPress={onOpenCart}
                        aria-label='Cart Menu'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="11.25" viewBox="0 0 576 512">
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu
                aria-label="Cart Actions" 
                className="w-96 p-1 overflow-y-auto sm:block" 
                closeOnSelect={false}
            >
                {cart && cart.length > 0 &&
                        <DropdownItem key="cart" className="gap-2 sticky top-0 z-10 w-full bg-gray-500 bg-opacity-25" textValue='Cart'>
                            <section className='flex justify-between items-center'>
                                <section className='flex items-center'> 
                                    <p className="font-bold">Carrito</p>
                                </section>
                                <Button color="danger" className='m-1' variant="light" onClick={emptyCart} isIconOnly isEnabled>
                                    <DeleteIcon color="white" />
                                </Button> 
                            </section>
                        </DropdownItem>                
                }
                {cart && cart.length > 0 ? (
                    cart.map((item, index) => (
                        <DropdownItem
                            key={item.product_id}
                            color='none'
                            textValue={item.product_id} 
                            showDivider
                            onClick={() => router.push(`/product/${item.product_id}`)}
                        >                
                            <AnimatePresence>
                                <CartItem item={item}/>
                            </AnimatePresence>
                        </DropdownItem>
                    ))
                    ) : (
                        <DropdownItem key="empty" textValue="empty">
                            <p>Vacío</p>
                        </DropdownItem>
                    )}
                {cart && cart.length > 0 && (
                    <DropdownItem key="checkout" className='items-center bg-green-500 bg-opacity-25 hover:bg-green-500 sticky bottom-0 z-10' color='success' textValue="checkout" onClick={handleReviewOrder}>
                        <section className='flex justify-between mx-2'>
                            <p>Revisar pedido:</p>
                            <p className='font-semibold'>{total} €</p>
                        </section>
                    </DropdownItem>
                )}
            </DropdownMenu>
        </Dropdown>
    );
};

export default CartMenu;
