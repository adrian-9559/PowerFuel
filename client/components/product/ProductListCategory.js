import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../../CSS/ProductCard.css';
import ProductCard from './ProductCard';
import { Spinner } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { getAllProductsByCategory } from '../../services/productService';

const ProductListCategory = () => {
    const { categoryId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const data = await getAllProductsByCategory(categoryId); // Usa el servicio
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
            <section className="container mx-auto flex justify-center items-center">
                <div>
                    {loading ? (
                        <Spinner />
                    ) : productos && productos.length > 0 ? (
                        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {productos.map((product) => (
                                <section 
                                    key={product.product_id} 
                                    onClick={() => navigate(`/product/${product.product_id}`)}
                                    className="cursor-pointer"
                                >
                                    <ProductCard product={product} />
                                </section>
                            ))}
                        </section>
                    ) : (
                        <p className="text-center">No se encontraron productos.</p>
                    )}
                </div>
            </section>
        </main>
    );
};

export default ProductListCategory;