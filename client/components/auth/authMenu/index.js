import React, { useEffect } from 'react';
import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import AuthTabs from './partials/authTabs';
import { motion } from 'framer-motion';

const AuthMenu = () => {

    const {isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                onOpen();
            }
        };
    
        // Agregar el event listener
        window.addEventListener('keydown', handleKeyDown);
    
        // Devolver una función para limpiar el event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <motion.section layout className="flex flex-col gap-2">
            <Button onClick={onOpen} >Iniciar sesión</Button>
            <Modal isOpen={isOpen} onClose={onClose} className='p-8 overflow-hidden' backdrop="blur" >
                <ModalContent className="w-12/12">
                    <AuthTabs/>
                </ModalContent>
            </Modal>
        </motion.section>
    );
};

export default AuthMenu;