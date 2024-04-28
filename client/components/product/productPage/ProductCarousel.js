// ProductImagesCarousel.js
import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { Skeleton, Image } from "@nextui-org/react";
import ProductService from '@services/productService';


const ProductCarousel = ({id}) => {

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
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
                    <div key={i} className={isThumbnail ? "w-16 h-16" : ""}>
                        <Skeleton isLoaded={id?true:false}>
                            <Image isZoomed
                                src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${id}/${i}.png`}
                                alt={`Imagen ${i} del producto ${id}`}
                                className="rounded shadow-lg object-cover cursor-pointer"
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
                    showArrows={true}
                    showStatus={false}
                    showThumbs={false}
                    infiniteLoop={true}
                    className='rounded-lg shadow-lg px-0 w-96 h-96'
                    selectedItem={selectedImageIndex}
                    transitionTime={500} // Aumenta la duración de la transición a 1 segundo
                >
                    {renderProductImages()}
                </Carousel>
            </Skeleton>
            <section className="flex flex-row justify-center items-center space-x-4 mt-4">
                {renderProductImages(true)}
            </section>
        </section>
    );
};

export default ProductCarousel;