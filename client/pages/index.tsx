
import React, { useEffect } from 'react';
import ProductList from '../components/product/ProductList.js';
import DefaultLayout from '../layouts/default';

import {NextUIProvider} from "@nextui-org/react";
const HomePage = () => {

    const [cart ,setCart] = React.useState([]);
    useEffect(() => {
        const cart = localStorage.getItem('cart');
        if(cart) {
            setCart(JSON.parse(cart));
        }
    }
    , []);
    return (
        <NextUIProvider>
            <DefaultLayout>
                <ProductList/>
            </DefaultLayout>
        </NextUIProvider>
    );
};

export default HomePage;