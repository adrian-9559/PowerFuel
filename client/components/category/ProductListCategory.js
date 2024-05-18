import React, { useState, useEffect } from 'react';
import ProductCard from '@components/product/ProductCard';
import { Spinner } from '@nextui-org/react';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';

const ProductListCategory = ({id}) => {
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await ProductService.getAllProductsByCategory(id);
                setProductos(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error.message);
                setLoading(false); // Indica que la carga ha terminado incluso si hay un error
            }
        };

        fetchProductos();
    }, [id]);

    return (
        <section className="container mx-auto flex flex-wrap justify-center items-center">
            {loading ? (
                <Spinner />
            ) : productos && productos.length > 0 && (
                productos.map((product) => (
                    <section 
                        key={product.product_id} 
                        onClick={() => router.push(`/product/${product.product_id}`)}
                        className="cursor-pointer m-2"
                    >
                        <ProductCard product={product} />
                    </section>
                ))
            )}
        </section>
    );
};

export default ProductListCategory;