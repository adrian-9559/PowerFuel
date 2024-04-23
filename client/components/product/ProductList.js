import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { getAllProducts } from '../../services/productService';

const ProductList = () => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getAllProducts(); // Usa el servicio
                setProductos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error.message);
                setLoading(false); // Indica que la carga ha terminado incluso si hay un error
            }
        };

        fetchProductos();
    }, []);

    return (
        <main className='mt-4'>
            <div className="container mx-auto flex flex-wrap justify-center items-center">
                {loading ? (
                    <Spinner />
                ) : productos && productos.length > 0 ? (
                    productos.map((product) => (
                        <div 
                            key={product.product_id} 
                            onClick={() => router.push(`/product/${product.product_id}`)}
                            className="cursor-pointer m-2"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No se encontraron productos.</p>
                )}
            </div>
        </main>
    );
};

export default ProductList;