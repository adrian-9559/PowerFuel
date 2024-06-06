import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductService from '@services/productService';
import CategoryService from '@services/categoryService';
import { Card, CardHeader, CardBody, Image, Spinner } from '@nextui-org/react';
import ProductCard from '@components/product/ProductCard';
import useTitle from '@hooks/useTitle'; 
import { easeIn } from 'framer-motion';

const HomeComponent = () => {
    const router = useRouter();
    const [productosNovedades, setProductosNovedades] = useState([]);
    const [productos, setProductos] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cargando, setCargando] = useState(true);
    const [itemsCount, setItemsCount] = useState(4);
    useTitle('Inicio');

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 4
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 2
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
        }
      };
    
    useEffect(() => {
        fetchProductos();
        fetchRamdomProducts();
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const categories = await CategoryService.getAllCategories();
            setCategories(categories);
        } catch (error) {
            console.error('Error fetching categories:', error.message);
        }
    };
    
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

    function seleccionarCategoriasYGenerarCards(numCards) {
        function generarCard(categoria) {
            function generarColorAleatorio() {
                let rojo = Math.floor(Math.random() * (256 - 150) + 150);
                let verde = Math.floor(Math.random() * (256 - 150) + 150);
                let azul = Math.floor(Math.random() * (256 - 150) + 150);

                let luminancia = (0.299 * rojo + 0.587 * verde + 0.114 * azul) / 255;

                let colorTexto = luminancia > 0.5 ? 'black' : 'white';
            
                return {
                    colorFondo: `rgb(${rojo}, ${verde}, ${azul})`,
                    colorTexto: colorTexto
                };
            }

            let colores = generarColorAleatorio();

            return (
                categoria && (
                    <Card key={categoria.category_id} className="col-span-12 sm:col-span-4 h-40" isPressable onPress={() => router.push(`/category/${categoria.category_id}`)} style={{backgroundColor: colores.colorFondo, color: colores.colorTexto}}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny uppercase font-bold">Categoria</p>
                            <h4 className="font-medium text-large">{categoria.category_name}</h4>
                        </CardHeader>
                    </Card>
                )
            );
        }
    
        // Creamos una copia de la lista de categorías
        let categoriasCopia = [...categories];

        // Si no hay suficientes categorías disponibles, retornamos un mensaje
        if (categoriasCopia.length < numCards) {
            return <p>No hay suficientes categorias disponibles.</p>;
        }

        let categoriasSeleccionadas = [];

        for (let i = 0; i < numCards; i++) {
            let indiceAleatorio = Math.floor(Math.random() * categoriasCopia.length);
            let categoriaAleatoria = categoriasCopia[indiceAleatorio];

            categoriasSeleccionadas.push(categoriaAleatoria);

            // Eliminamos la categoría de la copia, no de la lista original
            categoriasCopia.splice(indiceAleatorio, 1);
        }

        return categoriasSeleccionadas.map((categoria, index) => generarCard(categoria));
    }

    const CategoryGroup = () => {

        const rand = Math.floor(Math.random() * 3 + 2);
        let rand2 = Math.floor(Math.random() * 3 + 2);

        while (rand === rand2) {
            rand2 = Math.floor(Math.random() * 3 + 2);
        }
        return (
            <section className='flex flex-col gap-3'>
    <section className="grid grid-flow-row sm:grid-flow-col gap-3">
        {seleccionarCategoriasYGenerarCards(rand)}
    </section>
    <section className="grid grid-flow-row sm:grid-flow-col gap-3">
        {seleccionarCategoriasYGenerarCards(rand2)}
    </section>
</section>
        );
    }

    return (
        <main className="flex flex-col p-6 gap-4">
            <section >
                <h1 className="font-bold text-4xl">Bienvenido a <span className='text-blue-500'>PowerFuel!</span></h1>
            </section>
            <section>
                <section className="flex flex-col sm:flex-row gap-3 h-60 w-full">
                    <Card className='w-full h-full shadow-lg' isPressable onPress={() => router.push(`/search/novedades`)}> 
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                            <h4 className="text-white font-medium text-large">Novedades</h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card backgroun Novedades"
                            className="z-0 w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/novedades.webp`}
                        />
                    </Card>
                    <Card className='w-full h-full shadow-lg' isPressable onPress={() => router.push(`/search/antiguos`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">Productos</p>
                            <h4 className="text-white font-medium text-large">Más antiguos</h4>
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
            <CategoryGroup/>
            <section className='flex flex-col sm:flex-row'>
                <Card className="shadow-lg max-w-7xl">
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                            Lo mas nuevo
                        </h1>
                    </CardHeader>
                    <CardBody>
                            <Carousel
                                swipeable={true}
                                draggable={true}
                                arrows={false}
                                showDots={false}
                                responsive={responsive}
                                centerMode={true}
                                infinite={true}
                                autoPlay={true}
                                autoPlaySpeed={1300}
                                minimumTouchDrag={40}
                                keyBoardControl={false}
                                transitionDuration={1000}
                                removeArrowOnDeviceType={["tablet", "mobile"]}
                                dotListClass="custom-dot-list-style"
                                itemClass="carousel-item-padding-40-px px-32 mx-4"
                                
                            >
                                {renderProductosNovedades()}
                            </Carousel>
                    </CardBody>
                </Card>
            </section>
            <CategoryGroup/>
            <section>
                <Card className="w-full shadow-lg" >
                    <CardHeader className="flex-col !items-start">
                        <h1 className="font-bold text-2xl bg-blue-800 bg-opacity-50 text-white w-full p-2 pl-4 shadow-lg rounded-lg">
                            Productos
                        </h1>
                    </CardHeader>
                    <CardBody className='w-full flex flex-row gap-3 items-center justify-center'>
                    {loading ? (
                        <Spinner />
                    ) : productos ? (
                        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
                            {productos.map((product) => (
                                <ProductCard key={product.product_id} product={product} />
                            ))}
                        </section>
                    ) : (
                        <p>No hay productos disponibles.</p>
                    )}
                    </CardBody>
                </Card>
            </section>
            <CategoryGroup/>
        </main>
    );
}

export default HomeComponent;