// product.js
import React, { useEffect, useState } from 'react';
import { getProductById } from '../../services/productService';
import { Skeleton} from "@nextui-org/react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useRouter} from 'next/router';
import NavigationBar from '../../components/navigation/NavigationBar';
import QuantityInput from '../../components/product/productPage/QuantityInput';
import ProductCarousel from '../../components/product/productPage/ProductCarousel';

const Product = () => {
    const router = useRouter();
    const { id } = router.query
    const [product, setProduct] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setIsLoaded(false); // Muestra el esqueleto
                const productData = await getProductById(id);
                    setProduct(productData);
                    setIsLoaded(true); 
            } catch (error) {
                console.error('Error fetching product:', error.message);
                setIsLoaded(true); // Muestra el contenido del esqueleto
            }
        };
    
        fetchProducto();
    }, [id]);

    return (
        <>
            <NavigationBar/>
            <main>
                <section className='flex flex-col items-center justify-center p-4 rounded-lg bg-white'>
                    <section className='w-full max-w-4xl p-8 flex flex-row'>
                        <ProductCarousel
                            id={id}
                        />
                        <section className='w-full md:w-1/2 md:pl-8'>
                            <section className='w-full max-w-4xl rounded-lg flex items-center'>
                                <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2">
                                    <h1 className='text-3xl font-bold text-gray-700'>{product?.product_name}</h1>
                                </Skeleton>
                            </section>
                            <section className='mb-4'>
                                <h2 className='text-xl font-semibold text-gray-700'>{"Precio:"}</h2>
                                <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2 mt-2">
                                    <p className='text-gray-600'>{product?.price} €</p>
                                </Skeleton>
                            </section>
                            <QuantityInput
                                id={id}
                            />
                        </section>
                    </section>
                    <section className='w-full max-w-4xl p-8'>
                        <h2 className='text-xl font-semibold text-gray-700'>{"Descripción:"}</h2>
                        
                        <Skeleton isLoaded={isLoaded} className="rounded-lg h-auto py-2">
                            <p className='text-gray-600'>{product?.description}</p>
                        </Skeleton>
                    </section>
                </section>
            </main>
        </>
    );
};

export default Product;