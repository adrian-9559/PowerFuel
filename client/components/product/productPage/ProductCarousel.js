// ProductImagesCarousel.js
import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Skeleton, Image } from "@nextui-org/react";
import ProductService from '@services/productService';

const ProductCarousel = ({id}) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(1);
    const [imageCount, setImageCount] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };
    
    useEffect(() => {
        if (id) {
            ProductService.getImageCount(id)
                .then(count => {
                    setImageCount(count);
                    if (count > 0) {
                        setIsLoaded(true);
                    }
                });
        }
    }, [id]);

    const renderProductImages = (isThumbnail = false) => {
        const images = [];
        for (let i = 1; i <= imageCount; i++) {
            if (id) {
                images.push(
                    <div key={i} className={`rounded-xl ${isThumbnail&&selectedImageIndex === i - 1 ? "border-1 border-gray-500" : ""}`}>
                        <Skeleton isLoaded={id?true:false}>
                            <Image 
                                isZoomed
                                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${id}/${i}.png`}
                                alt={`Imagen ${i} del producto ${id}`}
                                className={`rounded shadow-lg object-cover cursor-pointer ${isThumbnail ? "w-16 h-16 z-1" : ""}`}
                                onClick={() => handleImageClick(i - 1)}
                            />
                        </Skeleton>
                    </div>
                );
            }
        }
        return images;
    };
    return (
        <section className='w-96 h-auto flex flex-col'>
            <Skeleton isLoaded={isLoaded} className="rounded-lg mw-96 h-96">
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
            </Skeleton>
            <section className="flex flex-row justify-center items-center mt-4 gap-4">
                {renderProductImages(true)}
            </section>
        </section>
    );
};

export default ProductCarousel;