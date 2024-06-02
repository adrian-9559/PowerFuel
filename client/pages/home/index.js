import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductService from '@services/productService';
import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';

const HomeComponent = () => {
    const router = useRouter();
    const [productosNovedades, setProductosNovedades] = useState([]);
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [itemsCount, setItemsCount] = useState(4);
    
    useEffect(() => {
        fetchProductos();
        fetchRamdomProducts();
    }, []);
    
    const fetchProductos = async () => {
        try {
            const novedades = await ProductService.getProductsNovedades(15, 1, 'DESC');
            setProductosNovedades(novedades);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching products:', error.message);
            setLoading(false);
        }
    };

    const fetchRamdomProducts = async () => {
        try {
            const productRamdom = await ProductService.getRandomProducts(20);
            setProductos(productRamdom);
        } catch (error) {
            console.error('Error fetching products:', error.message);
        }
    };

    const renderProductosNovedades = () => {
        return productosNovedades.map((product) => (
                <ProductCard product={product} key={product.product_id} />
        ));
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1200) {
                setItemsCount(1);
            } else if (window.innerWidth < 1475) {
                setItemsCount(2);
            } else if (window.innerWidth < 1750) {
                setItemsCount(3);
            } else {
                setItemsCount(4);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    

    return (
        <main className="flex flex-col gap-3 px-32">
            <section className="flex">
                <h1 className="font-bold text-4xl">Bienvenido a <span className='text-blue-500'>PowerFuel!</span></h1>
            </section>
            <section>
                <section className="flex grid-cols-2 gap-3 h-60">
                    <Card className='w-full h-full shadow-lg' isPressable onPress={() => router.push(`/category/novedades`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                            <h4 className="text-white font-medium text-large">Más vendidos</h4>
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
                            <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                            <h4 className="text-white font-medium text-large">Ofertas</h4>
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
            <section className="max-w-[140rem]">
                <Card className="shadow-lg ">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                            Novedades
                        </h1>
                    </CardHeader>
                    <CardBody className='w-full flex justify-center items-center'>
                            <Carousel
                                additionalTransfrom={0}
                                infinite
                                arrows={false}
                                autoPlaySpeed={1500}
                                autoPlay={true}
                                centerMode={true}
                                containerClass="w-full"
                                draggable
                                focusOnSelect={false}
                                keyBoardControl
                                minimumTouchDrag={80}
                                renderButtonGroupOutside={false}
                                renderDotsOutside={false}
                                showDots={false}
                                slidesToSlide={1}
                                swipeable

                                responsive={{
                                    superLargeDesktop: {
                                        breakpoint: { max: 4000, min: 0 },
                                        items: itemsCount
                                    }
                                }}
                            >
                            {renderProductosNovedades()}
                            </Carousel>
                    </CardBody>
                </Card>
            </section>
            <section className="gap-3 grid grid-cols-12">
                <Card className="col-span-12 sm:col-span-4 h-72">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny uppercase font-bold">Productos</p>
                        <h4 className="font-medium text-large">Más vendidos</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/masVendidos.webp`}
                    />
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-72">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny uppercase font-bold">Plant a tree</p>
                        <h4 className="font-medium text-large">Contribute to the planet</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-3.jpeg"
                    />
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-72">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny uppercase font-bold">Supercharged</p>
                        <h4 className="font-medium text-large">Creates beauty like a beast</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-2.jpeg"
                    />
                </Card>
            </section>
            <section>
                <Card className="max-w-[140rem] shadow-lg bg-gray-200 bg-opacity-50">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                            Productos
                        </h1>
                    </CardHeader>
                    <CardBody >
                        {loading ? (
                            <Spinner />
                        ) : productos && productos.length > 0 ? (
                                (() => {
                                    let rows = [];
                                    for (let i = 0; i < productos.length; i += 5) {
                                        rows.push(
                                            <div key={i} className="w-full flex flex-row gap-3 justify-start items-center">
                                                {productos.slice(i, i + 5).map((product) => (
                                                    <ProductCard product={product} key={product.product_id} />
                                                ))}
                                            </div>
                                        );
                                    }
                                    return rows;
                                })()
                            ) : (
                                <p className="text-center">No se encontraron productos.</p>
                            )
                        }
                    </CardBody>
                </Card>
            </section>
        </main>
    );
}

export default HomeComponent;