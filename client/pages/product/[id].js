// product.js
import React from 'react';
import { Skeleton } from "@nextui-org/react";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NavigationBar from '@components/navigation/NavigationBar';
import QuantityInput from '@components/product/productPage/QuantityInput';
import ProductCarousel from '@components/product/productPage/ProductCarousel';

const Product = ({ product }) => {
    return (
        <main className='flex flex-col items-center justify-center p-6'>
            <section className='flex flex-col bg-gray-600 bg-opacity-25 rounded-lg rounded-lg p-8'>
                <section className='w-full max-w-4xl p-8 flex flex-row bg-gray-500 bg-opacity-25 rounded-lg'>
                    <ProductCarousel
                        id={product.id}
                    />
                    <section className='w-full md:w-1/2 md:pl-8'>
                        <section className='w-full max-w-4xl rounded-lg flex items-center'>
                            <h1 className='text-3xl font-bold'>{product.product_name}</h1>
                        </section>
                        <section className='mb-4'>
                            <h2 className='text-xl font-semibold'>{"Precio:"}</h2>
                            <p>{product.price} €</p>
                        </section>
                        <QuantityInput
                            product={product}
                        />
                    </section>
                </section>
                <section className='mt-4 w-full max-w-4xl p-8 bg-gray-500 bg-opacity-25 rounded-lg'>
                    <h2 className='text-xl font-semibold'>{"Descripción:"}</h2>
                    <p>{product.description}</p>
                </section>
            </section>
        </main>
    );
};

export async function getServerSideProps(context) {
    const { id } = context.params;
    const product = await ProductService.getProductById(id);

    return {
        props: {
            product
        }
    }
}

export default Product;