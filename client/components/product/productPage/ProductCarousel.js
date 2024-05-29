// ProductImagesCarousel.js
import { useState, useEffect, use } from 'react';
import { Carousel } from 'react-responsive-carousel';
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
                    emulateTouch={true}
                    useKeyboardArrows={true}
                    showArrows={true}
                    showIndicators={false}
                    showStatus={false}
                    infiniteLoop={true}
                    className='rounded-lg shadow-lg px-0 w-96 h-96'
                    transitionTime={500}
                    selectedItem={selectedImageIndex}
                    onChange={setSelectedImageIndex}
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