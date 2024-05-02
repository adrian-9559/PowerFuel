// ProductImagesCarousel.js
import React, { useState, useEffect } from 'react';
import { Button } from "@nextui-org/react";
import { motion } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';



const SideMenu = ({productId}) => {
    const router = useRouter();
    const [categoriesParents, setCategoriesParents] = useState([]);
    const [showMenuLeft, setShowMenuLeft] = useState(false);

    const fetchParentCategories = async () => {
        const categories = await CategoryService.getParentCategories();
        setCategoriesParents(categories);
    };

    const toggleMenuLeft = () => {
        setShowMenuLeft(!showMenuLeft);
    };

    useEffect(() => {
        fetchParentCategories();
    }, []);

    useEffect(() => {
        // Función para manejar el clic en el documento
        function handleDocumentClick(event) {
            const menu = document.getElementById('menu');

            // Si el menú está abierto y el clic no es dentro del menú
            if (showMenuLeft && !menu.contains(event.target)) {
                setShowMenuLeft(false);
            }
        }
    
        // Agrega el listener al documento
        document.addEventListener('click', handleDocumentClick);

        // Elimina el listener al desmontar el componente
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showMenuLeft]);

    


    return (
        <section>
             <Button isIconOnly onClick={toggleMenuLeft}>
                 <svg xmlns="http://www.w3.org/2000/svg" height="10" width="8.75" viewBox="0 0 448 512">
                     <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/>
                 </svg>
             </Button>
             <motion.div 
                 initial={{ x: '-100%' }}
                 animate={{ x: showMenuLeft ? '0%' : '-100%' }}
                 transition={{duration: 0.5}}
                 className="fixed top-0 left-0 w-64 z-50 h-screen max-w-full shadow-2xl bg-white border-r border-gray-200"
                 onClick={(e) => e.stopPropagation()}
             >
                 <motion.div
                     id="menu"
                     initial={{ opacity: 0, rotate: 0, translateX: 100 }}
                     animate={{ opacity: showMenuLeft ? 1 : 0, rotate: showMenuLeft ? 360 : 0, translateX: showMenuLeft ? 0 : -65 }}
                     transition={{ duration: 0.5 }}
                     className="absolute right-0 m-4 z-40"
                 >
                     <Button 
                         isIconOnly 
                         radius="full" 
                         className="p-0 shadow"
                         onClick={(e) => { e.stopPropagation(); toggleMenuLeft(); }}
                     >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                             <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                         </svg>
                     </Button>
                 </motion.div>
                 <ul className="flex flex-col items-center mt-16">
                    {categoriesParents && categoriesParents.map((category) => (
                        <li className="w-full" key={category.category_id}>
                            <Button onClick={(e) => { e.stopPropagation(); router.push(`/category/${category.category_id}`); }} radius="none" className="bg-transparent w-full hover:bg-gray-200">
                                {category.category_name} {category.category_id}
                            </Button>
                        </li>
                    ))}
                </ul>
             </motion.div>
         </section>
     );
};

export default SideMenu;