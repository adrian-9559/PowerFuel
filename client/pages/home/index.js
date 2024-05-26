import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductService from '@services/productService';
import { Card, CardHeader, CardBody, Image, Spinner, CardFooter, Button } from '@nextui-org/react';
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
                        {loading ? (
                            <Spinner />
                        ) : productos && productos.length > 0 ? (
                            <div className="flex flex-wrap justify-around">
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
            <section className="mx-16 w-82 gap-2 grid grid-cols-12 grid-rows-2 my-5">
                <Card className="col-span-12 sm:col-span-4 h-72">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                        <h4 className="text-white font-medium text-large">Más vendidos</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-4.jpeg"
                    />
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-72">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Plant a tree</p>
                        <h4 className="text-white font-medium text-large">Contribute to the planet</h4>
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
                        <p className="text-tiny text-white/60 uppercase font-bold">Supercharged</p>
                        <h4 className="text-white font-medium text-large">Creates beauty like a beast</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-2.jpeg"
                    />
                </Card>
                <Card isFooterBlurred className="w-full h-72 col-span-12 sm:col-span-5">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">New</p>
                        <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Card example background"
                        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
                        src="https://nextui.org/images/card-example-6.jpeg"
                    />
                    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                        <div>
                            <p className="text-black text-tiny">Available soon.</p>
                            <p className="text-black text-tiny">Get notified.</p>
                        </div>
                        <Button className="text-tiny" color="primary" radius="full" size="sm">
                            Notify Me
                        </Button>
                    </CardFooter>
                </Card>
                <Card isFooterBlurred className="w-full h-72 col-span-12 sm:col-span-7">
                    <CardHeader className="absolute z-10 top-1 flex-col items-start">
                        <p className="text-tiny text-white/60 uppercase font-bold">Your day your way</p>
                        <h4 className="text-white/90 font-medium text-xl">Your checklist for better sleep</h4>
                    </CardHeader>
                    <Image
                        removeWrapper
                        alt="Relaxing app background"
                        className="z-0 w-full h-full object-cover"
                        src="https://nextui.org/images/card-example-5.jpeg"
                    />
                    <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                        <div className="flex flex-grow gap-2 items-center">
                            <Image
                                alt="Breathing app icon"
                                className="rounded-full w-10 h-11 bg-black"
                                src="https://nextui.org/images/breathing-app-icon.jpeg"
                            />
                            <div className="flex flex-col">
                                <p className="text-tiny text-white/60">Breathing App</p>
                                <p className="text-tiny text-white/60">Get a good night's sleep.</p>
                            </div>
                        </div>
                        <Button radius="full" size="sm">Get App</Button>
                    </CardFooter>
                </Card>
            </section>
        </main>
    );
}

export default HomeComponent;