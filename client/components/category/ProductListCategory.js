import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';

const ProductListCategory = ({id}, {categoryData}) => {
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(categoryData)
        const fetchProductos = async () => {
            try {
                const data = await ProductService.getAllProductsByCategory(id);
                try{
                    const newChildCategories = await CategoryService.getChildCategories(id);
                    if (newChildCategories.length > 0) {
                        for(let category of newChildCategories) {
                            const products = await ProductService.getAllProductsByCategory(category.category_id);
                            if(data){
                                data.push(...products);
                            }else{
                                setProductos(products);
                            }
                        }
                    }
                }catch(error){
                    console.error('Error fetching child categories:', error.message);
                }
                if(data){
                    setProductos(data);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error.message);
                setLoading(false);
            }
        };

        fetchProductos();
    }, [id]);

    return (
        <section className="">
            <Card className='flex w-full'>
                <CardHeader>
                    <h2 className="text-2xl font-bold">Productos</h2>
                </CardHeader>
                {loading ? (
                    <Spinner />
                ) : productos && productos.length > 0 && (
                    productos.map((product) => (
                        <ProductCard product={product} onClick={() => router.push(`/product/${product.product_id}`)}/>
                    ))
                )}
            </Card>
        </section>
    );
};

export default ProductListCategory;