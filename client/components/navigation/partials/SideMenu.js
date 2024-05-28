// SideMenu.js
import React, { useState, useEffect } from 'react';
import { Button, Accordion, AccordionItem, Card } from "@nextui-org/react";
import { motion } from 'framer-motion';
import CategoryService from '@services/categoryService';
import { useRouter } from 'next/router';

const SideMenu = ({ productId }) => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [showMenuLeft, setShowMenuLeft] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);


    const toggleMenuLeft = () => {
        setShowMenuLeft(!showMenuLeft);
    };

    useEffect(() => {
        const fetchAllCategories = async () => {
            const categories = await CategoryService.getAllCategories();
            console.log(categories);
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
        <section>
            <Button isIconOnly onClick={toggleMenuLeft}>
                <svg xmlns="http://www.w3.org/2000/svg" height="10" width="8.75" viewBox="0 0 448 512">
                    <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
            </Button>
            <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: showMenuLeft ? '0%' : '-100%' }}
                transition={{ duration: 0.5 }}
                className="fixed top-0 left-0 w-64 z-50 h-screen max-w-full shadow-2xl border-r bg-default p-5"
                onClick={(e) => e.stopPropagation()}
                style={{ zIndex: 2 }}
            >
                <section
                    className='flex justify-end w-full h-auto p-0 m-0'
                >
                    <motion.div
                        id="menu"
                        initial={{ rotate: 0, translateX: 100 }}
                        animate={{ rotate: showMenuLeft ? 360 : 0, translateX: showMenuLeft ? 0 : -65 }}
                        transition={{ duration: 0.5 }}
                        className={`w-auto h-auto`}
                        style={{ zIndex: 1 }}
                    >
                        <Button
                            isIconOnly
                            radius="full"
                            color='primary'
                            onClick={(e) => { e.stopPropagation(); toggleMenuLeft(); }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </Button>
                    </motion.div>
                </section>
                <Accordion
                    selectedKeys={hoveredIndex}
                >
                    {Array.isArray(categories) && categories.map((category, index) => (
                        <AccordionItem
                            className='w-full h-auto p-0 m-0 '
                            aria-label={category.category_name}
                            title={category.category_name}
                            key={category.category_id}
                            onMouseEnter={() => setHoveredIndex(category.category_id.toString())}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {Array.isArray(category.children) && category.children.map((categoryChild, index) => (
                                <Button className='w-full' variant='light' color='secondary' key={categoryChild.category_id} radius="none" onClick={() => { router.push(`/category/${categoryChild.category_id}`); }}>{categoryChild.category_name}</Button>
                            ))}
                        </AccordionItem>
                    ))}
                </Accordion>
            </motion.div>
        </section>
    );
};

export default SideMenu;