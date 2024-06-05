import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';
import useTitle from '@hooks/useTitle'; 

const ProductListCategory = () => {
    const router = useRouter();
    const { id } = router.query;
    const [category, setCategory] = useState({});
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const {setTitle} = useTitle("Página de Categoría");

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const dataCategory = await CategoryService.getCategoryById(id);
                setCategory(dataCategory);
                setTitle(dataCategory.category_name);
                const data = await ProductService.getAllProductsByCategory(id);
                try{
                    const newChildCategories = await CategoryService.getChildCategories(id);
                    if (newChildCategories.length > 0) {
                        for(let category of newChildCategories) {
                            const products = await ProductService.getAllProductsByCategory(category.category_id);
                            addUniqueProducts(data, products);
                        }
                    }
                }catch(error){
                    console.erro("No hay subcategorias");
                }
                if(data){
                    setProductos(data);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        if(id){
            fetchProductos();
        }
    }, []);

    const addUniqueProducts = (existingProducts, newProducts) => {
        const productIds = new Set(existingProducts.map(product => product.product_id));
        newProducts.forEach(product => {
            if (!productIds.has(product.product_id)) {
                existingProducts.push(product);
            }
        });
    };

    return (
        loading ? (
            <Spinner />
        ) : (
            <main className="w-full p-16">
                <Card className="max-w-[140rem] shadow-lg bg-gray-200 bg-opacity-50" >
                    <CardHeader className="flex-col !items-start">
                        {category && category.category_name &&
                            <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                                {category.category_name}
                            </h1>
                        }
                    </CardHeader>
                    <CardBody className='w-full flex flex-row gap-3 items-center justify-center'>
                        {loading ? (
                            <Spinner />
                        ) : productos && (
                            <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                                {productos.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </section>
                        )}
                    </CardBody>
                </Card>
            </main>
        )
    );
};

export default ProductListCategory;