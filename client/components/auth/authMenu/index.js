import { Button, Modal, ModalContent, useDisclosure } from "@nextui-org/react";
import AuthTabs from './partials/authTabs';
import { motion } from 'framer-motion';

const AuthMenu = () => {

    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <motion.section layout className="flex flex-col gap-2">
            <Button onPress={onOpen}>Iniciar sesión</Button>
            <Modal isOpen={isOpen} onClose={onClose} className='p-8 overflow-hidden z-99' backdrop="blur" >
                <ModalContent className="w-auto">
                    <AuthTabs/>
                </ModalContent>
            </Modal>
        </motion.section>
    );
};

export default AuthMenu;