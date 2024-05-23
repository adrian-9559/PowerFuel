import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductService from '@services/productService';
import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';

const HomeComponent = () => {
    const router = useRouter();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchProductos();
    }, []);
    
    const fetchProductos = async () => {
        try {
            const data = await ProductService.getProductsNovedades(15, 1, 'DESC');
            setProductos(data);
            setLoading(false);
            console.log('Productos:', data);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setLoading(false);
        }
    };

    return (
        <main className="grid gap-3">
            <section>
                <h1 className="font-bold text-2xl">Bienvenido a PowerFuel!</h1>
            </section>
            <section>
                <section className="flex grid-cols-2 gap-32 mx-16 my-4 h-60">
                    <Card className='w-full h-full shadow-lg' isPressable onPress={() => router.push(`/category/novedades`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <h1 className="font-bold text-2xl text-white">
                                Destacados
                            </h1>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card backgroun Novedades"
                            className="z-0 w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/novedades.webp`}
                        />
                    </Card>
                    <Card className='w-full h-full shadow-lg' isPressable onPress={() => router.push(`/category/ofertas`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <h1 className="font-bold text-2xl text-white">
                                Ofertas del día
                            </h1>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card background Ofertas"
                            className="z-0 w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/ofertas.webp`}
                        />
                    </Card>
                </section>
            </section>
            <section>
                <Card className="w-82 mx-16 shadow-lg bg-blue-200 bg-opacity-50">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-gray-200 bg-opacity-50 text-black w-full p-2 pl-4 shadow-lg rounded-lg">
                            Novedades
                        </h1>
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            <Spinner />
                        ) : productos && productos.length > 0 ? (
                            productos.map((product) => (
                                <section 
                                    key={product.product_id} 
                                    onClick={() => router.push(`/product/${product.product_id}`)}
                                    className="cursor-pointer mx-2 w-fit"
                                >
                                    <ProductCard product={product} />
                                </section>
                            ))
                        ) : (
                            <p className="text-center">No se encontraron productos.</p>
                        )}
                    </CardBody>
                </Card>
            </section>
        </main>
    );
}

export default HomeComponent;