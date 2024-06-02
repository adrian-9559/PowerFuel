import React, { useEffect, useState } from 'react';
import ProductList from '@components/product/ProductList';
import { useRouter } from 'next/router';
import ProductService from '@services/productService';

const Category = () => {
    const router = useRouter();
    const { query } = router.query;
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (query) {
            ProductService.getAllProductsSearch(query, 50, 1)
                .then(response => {
                    setProducts(response.products);
                })
                .catch(error => console.error(error));
        }
    }, [query]);

    return (
        <main className='px-32'>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>"{query}"</h1>
            <ProductList data={products} />
        </main>
    );
};

export default Category;