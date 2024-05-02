import { Card, CardBody, CardFooter, Button, Chip, Spinner} from "@nextui-org/react";
import { useState } from 'react';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
    const { cart, setCart } = useAppContext();
    const [isAdded, setIsAdded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            router.push(`/product/${product.product_id}`);
        }
    };

    const addToCart = (event) => {
        setIsLoading(true);
        const cartItem = cart.find(item => item.product_id === product.product_id);
        if (cartItem) {
            cartItem.quantity += 1;
            setCart([...cart]);
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
        
        setIsAdded(true);
        setTimeout(() => setIsLoading(false), 1000);
        setTimeout(() => {setIsAdded(false)}, 2000);
    };

    return (
        <Card  
            tabIndex="0" 
            onKeyDown={handleKeyDown} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className="w-64 h-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <CardBody className="overflow-visible p-0 relative h-full">
                <section className='bg-cover bg-center h-full w-full relative' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png)` }}> 
                    <section className="absolute bottom-2 left-2">
                        <Chip 
                            size="lg" 
                            radius="full"
                            endContent= { 
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 w-5" viewBox="0 0 24 24">
                                    <path d="M15 18.5C12.49 18.5 10.32 17.08 9.24 15H15V13H8.58C8.53 12.67 8.5 12.34 8.5 12C8.5 11.66 8.53 11.33 8.58 11H15V9H9.24C10.32 6.92 12.5 5.5 15 5.5C16.61 5.5 18.09 6.09 19.23 7.07L21 5.3C19.41 3.87 17.3 3 15 3C11.08 3 7.76 5.51 6.52 9H3V11H6.06C6.02 11.33 6 11.66 6 12C6 12.34 6.02 12.67 6.06 13H3V15H6.52C7.76 18.49 11.08 21 15 21C17.31 21 19.41 20.13 21 18.7L19.22 16.93C18.09 17.91 16.62 18.5 15 18.5Z"/>
                                </svg>
                            }
                        >
                            <p className="font-bold">{product.price}</p>
                        </Chip>
                    </section>
                    <Button 
                        radius="full" 
                        className={`absolute bottom-2 right-2 text-black z-10 transition-opacity duration-2000 ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
                        isIconOnly 
                        onPress={addToCart}
                        onFocus={() => setIsHovered(true)}
                        onBlur={() => setIsHovered(false)}
                    >
                        <motion.div
                            key={isAdded ? 'added' : 'not-added'}
                            initial={{ opacity: 0, scale: 0.7, rotate: 0}}
                            animate={{ opacity: 1, scale: 1 , rotate: isAdded ? 360 : 0}}
                            exit={{ opacity: 0, scale: 0.7 , rotate:0}}
                            transition={{ duration: 0.5 }}
                            className="flex justify-center items-center"
                        >
                            {isLoading ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
                                    <path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity="0.25"/>
                                    <path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                                        <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                                    </path>
                                </svg>
                            ) : isAdded ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 576 512">
                                    <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                                </svg>
                            )}
                        </motion.div>
                    </Button>
                </section>
            </CardBody>
            <CardFooter className="text-small justify-between" style={{height: '40px', overflow: 'hidden'}}>
                <b>{product.product_name}</b>
            </CardFooter>
        </Card>
    );
}

export default ProductCard;