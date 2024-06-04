// SideMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionItem, Card, CardBody, Divider } from "@nextui-org/react";
import { motion } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';

const SideMenu = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [showMenuLeft, setShowMenuLeft] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const toggleMenuLeft = () => {
        setIsAnimating(true);
        setShowMenuLeft(!showMenuLeft);
    };

    useEffect(() => {
        const fetchAllCategories = async () => {
            const categories = await CategoryService.getAllCategories();
            setCategories(categories);
        };
        fetchAllCategories();
    }, []);

    useEffect(() => {
        function handleDocumentClick(event) {
            const menu = document.getElementById('menu');
            if (showMenuLeft && !menu.contains(event.target)) {
                setShowMenuLeft(false);
            }
        }
        document.addEventListener('click', handleDocumentClick);
        return () => {
            document.removeEventListener('click', handleDocumentClick);
        };
    }, [showMenuLeft]);

    return (
        <section className='h-auto'>
            <Button isIconOnly onClick={toggleMenuLeft} aria-label="Toggle menu" >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className='w-3 h-3'>
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
            </Button>
            {(showMenuLeft || isAnimating) && (
                <motion.div
                    initial={{ x: -500 }}
                    animate={{ x: showMenuLeft ? 0 : -500 }}
                    transition={{ 
                        duration: 0.3,
                        onStart: () => setIsAnimating(true),
                        onComplete: () => setIsAnimating(false)
                    }}
                    className='fixed top-0 left-0 h-screen w-1/5  bg-default-200 z-50 shadow-lg p-8 pt-20 '
                    id='menu'
                    onClick={(e) => e.stopPropagation()}
                    style={{ zIndex: 2 }}
                    onMouseEnter={() => setHoveredIndex(null)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onFocus={() => setHoveredIndex(null)}
                    onBlur={() => setHoveredIndex(null)}
                    tabIndex="0"
                    onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                            setShowMenuLeft(false);
                        }
                    }}
                    role="menu"
                    aria-label="Menu"
                    aria-expanded={showMenuLeft}
                    aria-orientation="vertical"
                    aria-haspopup="true"
                    aria-activedescendant={hoveredIndex}
                >
                    <Accordion>
                        {categories && categories.map((category, index) => {
                            const subcategories = categories.filter(category2 => category2.parent_category_id === category.category_id);
                            return (
                                category.parent_category_id === null &&
                                <AccordionItem key={index} index={index} title={category.category_name}>
                                    <section>
                                        <Card>
                                            <CardBody>
                                                {subcategories.length > 0 ? (
                                                    subcategories.map((subcategory, index2) => (
                                                        <Button key={subcategory.category_id} className='w-full' variant='light' color='secondary' radius="none" onClick={() => { router.push(`/category/${subcategory.category_id}`); }}>{subcategory.category_name}</Button>
                                                    ))
                                                ) : (
                                                    <p>No hay subcategorías</p>
                                                )}
                                            </CardBody>
                                        </Card>
                                    </section>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                    <Button onClick={toggleMenuLeft} className='absolute top-0 right-0 m-8' isIconOnly color='primary'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </motion.div>
            )}
        </section>
    );
};

export default SideMenu;