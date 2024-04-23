// ProductImagesCarousel.js
import React, {useState } from 'react';
import {Button, Input } from "@nextui-org/react";

const QuantityInput = ({id}) => {

    
    const [countProduct, setCountProduct] = useState(1);

    const handlePlusClick = () => {
        setCountProduct(countProduct + 1);
    };

    const handleMinusClick = () => {
        if(countProduct > 1)
            setCountProduct(countProduct - 1);
        else
            setCountProduct(1);
    };


    const addToCart = () => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productInCart = cart.find(item => item.id === id);

        productInCart ? productInCart.quantity += countProduct : cart.push({ id: id, quantity: countProduct });

        localStorage.setItem('cart', JSON.stringify(cart));
    };

    return (
        <section>
            <section className='flex justify-center  space-x-2'>
                <Button isIconOnly onClick={handleMinusClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                    </svg>
                </Button>
                <Input className={`m-0`} defaultValue='1' value={countProduct}/>
                <Button isIconOnly onClick={handlePlusClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Button>
            </section>
            <Button color="primary" auto className='w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600' onClick={addToCart}>{"Añadir al carrito" }</Button>
        </section>  
    );
};

export default QuantityInput;