import { Card, CardBody, CardFooter, Button, Chip} from "@nextui-org/react";
//import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { setCart as setCartAction } from '../../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useRouter } from "next/router";

const ProductCard = ({ product }) => {
    const router = useRouter();
    const [isHovered, setIsHovered] = useState(false);
    const dark = localStorage.getItem('theme') === 'dark' ? true : false;
    const dispatch = useDispatch();


    const handleClick = () => {
        //navigate(`/product/${product.product_id}`);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            router.push(`/product/${product.product_id}`);
        }
    };

    const addToCart = (event) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item.id === product.product_id);

        productInCart ? productInCart.quantity++ : cart.push({ id: product.product_id, quantity: 1 });

        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch(setCartAction(JSON.parse(localStorage.getItem('cart')) || []));
    };

    return (
        <Card  
            tabIndex="0" 
            onPress={handleClick} 
            onKeyDown={handleKeyDown} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className="w-64 h-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            <CardBody className="overflow-visible p-0 relative h-full">
                <section className='bg-cover bg-center h-full w-full relative' style={{ backgroundImage: `url(http://25.65.210.24:4001/public/images/product/${product.product_id}/1.png)` }}> 
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
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 576 512">
                            <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192H32c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512H430c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32H458.4L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192H171.7L253.3 35.1zM192 304v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16zm128 16v96c0 8.8-7.2 16-16 16s-16-7.2-16-16V304c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
                        </svg>
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