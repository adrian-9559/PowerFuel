import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import AuthTabs from './partials/authTabs';
import { motion } from 'framer-motion';

const LoginMenu = () => {

    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <motion.section layout>
            <Button onPress={onOpen}>Iniciar sesión</Button>
            <Modal isOpen={isOpen} onClose={onClose} className='p-8 overflow-hidden'>
                <ModalContent className="w-20%">
                    <AuthTabs/>
                </ModalContent>
            </Modal>
        </motion.section>
    );
};

export default LoginMenu;