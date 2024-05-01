import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, ModalContent, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import LoginForm from './partials/loginForm';
import RegisterForm from './partials/registerForm';
import AuthTabs from './partials/authTabs';

const LoginMenu = () => {

    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <section>
        <Button onPress={onOpen}>Iniciar sesión</Button>
        <Modal isOpen={isOpen} onClose={onClose} className='p-8 modalLogin'>
            <ModalContent className="w-20%">
                <AuthTabs/>
            </ModalContent>
        </Modal>
        </section>
    );
};

export default LoginMenu;