import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, Spinner } from '@nextui-org/react';
import ProductService from '@services/productService';
import { useRouter } from 'next/router';
import ProductCard from '@components/product/ProductCard';
import useTitle from '@hooks/useTitle';

const SearchComponent = () => {
    const router = useRouter();
    const search = router.query.search;
    const [productos, setProductos] = useState([]);
    const [page, setPage] = useState([]);
    const [loading, setLoading] = useState(true);
    const { setTitle } = useTitle(`Productos`);

    useEffect(() => {
        const searchNovedades = async () => {
            const data = await ProductService.getProductsNovedades(20, page);
            setProductos(data);
            setLoading(false);
        }

        const searchAntiguos = async () => {
            const data = await ProductService.getProductsNovedades(20, page, 'DESC');
            setProductos(data);
            setLoading(false);
        }

        const searchTodos = async () => {
            const response = await ProductService.getProducts(page, 20);
            setProductos(response.products);
            setLoading(false);
        }

        setLoading(true);

        switch (search) {
            case 'novedades':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchNovedades();
                break;
            case 'antiguos':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchAntiguos();
                break;
            case 'all':
                setTitle(search.charAt(0).toUpperCase() + search.slice(1));
                searchTodos();
                break;
        }

    }, [search, page])

    return (
        loading ? (
            <div className='w-96 h-96'>
                <Spinner />
            </div>
        ) : (
            <main className="flex flex-col p-6 gap-4">
                <section className='w-full'>
                    <Card className="w-full shadow-lg" >
                        <CardHeader className="flex-col !items-start">
                            {search &&
                                <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                                    {search.charAt(0).toUpperCase() + search.slice(1)}
                                </h1>
                            }
                        </CardHeader>
                        <CardBody className='w-full flex flex-row gap-3 items-center justify-center'>
                            {loading ? (
                                <Spinner />
                            ) : productos && (
                                <section key={productos} className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-10">
                                    {productos.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </section>
                            )}
                        </CardBody>
                    </Card>
                </section>
            </main>
        )
    );
}

export default SearchComponent;