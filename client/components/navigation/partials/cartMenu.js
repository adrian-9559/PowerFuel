import React, { useState, useEffect }from 'react';
import { Dropdown, DropdownMenu, DropdownItem, DropdownTrigger, Button, Badge, useDisclosure, user, ScrollShadow } from "@nextui-org/react";
import CartItem from '@components/cart/cartItem';
import { useRouter } from 'next/router';
import { useAppContext } from "@context/AppContext";
import { AnimatePresence } from 'framer-motion';
import ProductService from '@services/productService';


const CartMenu = () => {
    const { cart, setCart } = useAppContext();
    const [cartAux, setCartAux] = useState(cart?[...cart]:[]);
    const [total, setTotal] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFirstLoad, setIsFirstLoad] = useState(true); // Nueva variable de estado
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure(false);


    const handleDeleteCart = () => {
        setCart([]);
        if(isOpen)
            onOpenChange(false);
    }
    
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
    
    function quantityHasChanged(newCart, oldCart) {
        for(let i = 0; i < newCart.length; i++) {
            const oldItem = oldCart.find(item => item.product_id === newCart[i].product_id);
            if(!oldItem || oldItem.quantity !== newCart[i].quantity) {
                return true;
            }
        }
        return false;
    }

    useEffect(() => {
        setIsLoading(true);
        getTotalPrice();
        setTimeout(() => {
            setIsLoading(false);
            if(!isFirstLoad && !isOpen && cart && cart.length > 0 && (quantityHasChanged(cartAux, cart) || cartAux.length !== cart.length))
                onOpenChange(true);
            if(isFirstLoad) setIsFirstLoad(false); // Cambiar el estado después de la primera carga
        }, 750);
    }, [cart]);

    const handleReviewOrder = () => {
        onOpenChange(false);
        router.push('/cart')
    }

    
    return (
        <Dropdown 
            isOpen={isOpen}
            onOpenChange={onOpenChange} 
            showArrow 
        >
        <Badge content={isLoading ? (
                <svg 
                    className="w-2   h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/>
                    <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </path>
                </svg>
            ) : 
                cart?cart.length:0
            }  
            color="primary" 
            isInvisible={cart && cart.length === 0}
            >
                <DropdownTrigger>
                    <Button 
                        isIconOnly 
                        onPress={onOpen} 
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" height="10" width="11.25" viewBox="0 0 576 512">
                            <path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"/>
                        </svg>
                    </Button>
                </DropdownTrigger>
            </Badge>
            <DropdownMenu
                aria-label="Cart Actions" 
                className="w-96 p-1 overflow-y-auto " 
                closeOnSelect={false}
            >
                {cart && cart.length > 0 &&
                        <DropdownItem key="cart" className="gap-2 sticky top-0 z-10 w-full bg-gray-500 bg-opacity-25" textValue='Cart'>
                            <section className='flex justify-between items-center'>
                                <section className='flex items-center'> {/* Add flex and items-center here */}
                                    <p className="font-bold">Carrito</p>
                                </section>
                                <Button color="danger" className='m-1' variant="light" onClick={handleDeleteCart} isIconOnly isEnabled>
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
