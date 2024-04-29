import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, ModalContent, ModalFooter, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import LoginForm from './partials/loginForm';
import RegisterForm from './partials/registerForm';
import AuthTabs from './partials/authTabs';

const LoginMenu = () => {

    const {isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    return (
        <>
        <Button onPress={onOpen}>Iniciar sesión</Button>
        <Modal isOpen={isOpen} onClose={onClose} className='p-8'>
            <ModalContent>
                <AuthTabs/>
            </ModalContent>
            <ModalFooter>
                <p className="text-red">{"hola"}</p>
            </ModalFooter>
        </Modal>
        </>
    );
};

export default LoginMenu;