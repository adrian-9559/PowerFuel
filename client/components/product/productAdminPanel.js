import React, { useState, useEffect } from 'react';
import ProductCarousel from '@components/product/productPage/ProductCarousel';
import ProductService from '@services/productService';
import Carousel from 'react-multi-carousel';
import { Card, CardHeader, CardBody, ScrollShadow, Image, Chip } from "@nextui-org/react";
import { format } from 'date-fns';

const statusColorMap = {
    Enabled: "success",
    Disabled: "danger",
}; 

const ProductAdminPanel = ({productId}) => {
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [imageCount, setImageCount] = useState(0);
    const [selectedImageIndex, setSelectedImageIndex] = useState(1);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        ProductService.getProductById(productId)
            .then(res => {
                setProduct(res);
                setIsLoading(false);
            })
            .catch(err => {
                setIsLoading(false);
            });
    }, [productId]);

    useEffect(() => {
        if (productId) {
            ProductService.getImageCount(productId)
                .then(count => {
                    setImageCount(count);
                    if (count > 0) {
                        setIsLoaded(true);
                    }
                });
        }
    }, [productId]);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const renderProductImages = (isThumbnail = false) => {
        const images = [];
        for (let i = 1; i <= imageCount; i++) {
            if (productId) {
                images.push(
                    <div key={i} className={`rounded-xl ${isThumbnail&&selectedImageIndex === i - 1 ? "border-1 border-gray-500" : ""}`}>
                        <Image 
                            isZoomed
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${productId}/${i}.png`}
                            alt={`Imagen ${i} del producto ${productId}`}
                            className={`rounded shadow-lg object-cover cursor-pointer ${isThumbnail ? "w-16 h-16 z-1" : ""}`}
                            onClick={() => handleImageClick(i - 1)}
                            disableSkeleton={isLoaded}
                        />
                    </div>
                );
            }
        }
        return images;
    };

    return (
        <section>
            {isLoading ? (
                <section>
                    <h4>Loading...</h4>
                </section>
            ) : (
                <section className='w-full h-full grid gap-8 p-3'>
                    <section>
                        <section className='w-full'>
                            <h1 className='text-3xl font-bold'>{product.product_name}</h1>
                        </section>
                    </section>
                    <section className='flex gap-28 px-3 pb-3'>
                        <section className='w-5/18'>
                            <section className='w-80 h-auto'>
                                <Carousel
                                    additionalTransfrom={0}
                                    arrows={imageCount > 1}
                                    centerMode={false}
                                    className=""
                                    containerClass="container"
                                    draggable
                                    focusOnSelect={false}
                                    infinite
                                    itemClass=""
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
                                            items: 1,
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
                                            items: 1,
                                            slidesToSlide: 1,
                                            partialVisibilityGutter: 30
                                        }
                                    }}
                                    showDots={false}
                                    sliderClass=""
                                    slidesToSlide={1}
                                    swipeable
                                >
                                    {renderProductImages()}
                                </Carousel>
                                <section className='flex flex-row gap-2 justify-center items-center pt-3'>
                                    {renderProductImages(true)}
                                </section>
                            </section>
                            <section className='pt-6 grid w-full'>
                                <section>
                                    <span className='text-xl'>- <span className='font-bold'>Stock: </span> {product.stock_quantity}</span>
                                </section>
                                <section>
                                    <span className='text-xl'>- <span className='font-bold'>Categoría: </span> {product.Category.category_name}</span>
                                </section>
                                <section>
                                    <span className='text-xl'>- <span className='font-bold'>Marca: </span> {product.Brand.brand_name}</span>
                                </section>
                                <section>
                                     <span className='text-xl'>- <span className='font-bold'>Día Registrado: </span> {format(new Date(product.registration_date), 'dd-MM-yyyy')}</span>
                                </section>
                                <section>
                                    <span className='text-xl'>- <span className='font-bold'>Estado: </span> <Chip className="capitalize" color={statusColorMap[product.status]} size="sm" variant="flat">{product.status}</Chip></span>
                                </section>
                            </section>
                        </section>
                        <section className='grid gap-5 w-8/12'>
                            <section>
                                <p className='text-2xl'><span className='font-bold'>Precio:</span> {product.price} €</p>
                            </section>
                            <section>
                                <Card className='bg-gray-200 bg-opacity-15 w-full'>
                                    <CardHeader>
                                        <h3 className='font-bold text-xl px-2 pt-2'>Descripción:</h3>
                                    </CardHeader>
                                    <CardBody className='pt-0'>
                                        <ScrollShadow className='h-[27rem] px-4'>
                                            <p style={{ whiteSpace: 'pre-line' }} >{product.description}</p>
                                        </ScrollShadow>
                                    </CardBody>
                                </Card>
                            </section>
                        </section>
                    </section>
                </section>
            )}
        </section>
    );
};

export default ProductAdminPanel;