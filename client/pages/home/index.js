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
        return productosNovedades.map((product, index) => (
            <section key={index} className="cursor-pointer mx-2 w-fit flex flex-row items-center">
                <ProductCard product={product} />
            </section>
        ));
    }

    

    return (
        <main className="grid gap-3">
            <section className="w-fit flex ml-16">
                <h1 className="font-bold text-4xl">Bienvenido a <span className='text-blue-500'>PowerFuel!</span></h1>
            </section>
            <section>
                <section className="flex grid-cols-2 gap-32 mx-16 my-4 h-60">
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
            <section>
                <Card className="w-82 mx-16 shadow-lg bg-gray-200 bg-opacity-50">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-black w-full p-2 pl-4 shadow-lg rounded-lg">
                            Novedades
                        </h1>
                    </CardHeader>
                    <CardBody>
                    <Carousel
                        additionalTransfrom={0}
                        infinite
                        arrows={false}
                        autoPlaySpeed={1500}
                        autoPlay={true}
                        centerMode={true}
                        containerClass="container"
                        draggable
                        focusOnSelect={false}
                        keyBoardControl
                        minimumTouchDrag={80}
                        renderButtonGroupOutside={false}
                        renderDotsOutside={false}
                        responsive={{
                            desktop: {
                            breakpoint: {
                                max: 3000,
                                min: 1024
                            },
                            items: 4,
                            slidesToSlide: 1,
                            partialVisibilityGutter: 40
                            },
                            mobile: {
                            breakpoint: {
                                max: 464,
                                min: 0
                            },
                            items: 1,
                            slidesToSlide: 1,
                            partialVisibilityGutter: 30
                            },
                            tablet: {
                            breakpoint: {
                                max: 1024,
                                min: 464
                            },
                            items: 2,
                            slidesToSlide: 1,
                            partialVisibilityGutter: 30
                            }
                        }}
                        showDots={false}
                        slidesToSlide={1}
                        swipeable
                        >
                        {renderProductosNovedades()}
                        </Carousel>
                    </CardBody>
                </Card>
            </section>
            <section className="mx-16 w-82 gap-2 grid grid-cols-12 my-5">
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
                <Card className="w-82 mx-16 shadow-lg bg-gray-200 bg-opacity-50">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-black w-full p-2 pl-4 shadow-lg rounded-lg">
                            Productos
                        </h1>
                    </CardHeader>
                    <CardBody>
                        {loading ? (
                            <Spinner />
                        ) : productos && productos.length > 0 ? (
                            <div className="grid grid-cols-4 gap-4">
                                {productos.map((product) => (
                                    <section 
                                        key={product.product_id} 
                                        onClick={() => router.push(`/product/${product.product_id}`)}
                                        className="cursor-pointer mx-2 w-fit flex flex-row items-center"
                                    >
                                        <ProductCard product={product} />
                                    </section>
                                ))}
                            </div>
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