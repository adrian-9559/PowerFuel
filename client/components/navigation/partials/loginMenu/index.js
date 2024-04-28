import React, { useState, useEffect } from 'react';
import { Button, Input, Modal, ModalContent, ModalFooter, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import LoginForm from './partials/loginForm';
import RegisterForm from './partials/registerForm';

const LoginMenu = ({ onLogin }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selected, setSelected] = useState('login');
    const [error, setError] = useState('');


    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('token') : null;

        if (token) {
            onOpenChange(false);
        }
    }, []);

    return (
        <>
        <Button onPress={onOpen}>Iniciar sesión</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='p-8'>
            <ModalContent>
                {(onClose) => (
                    <Tabs
                    fullWidth
                    size="md"
                    aria-label="Tabs form"
                    selectedKey={selected}
                    onSelectionChange={setSelected}
                  >
                    <Tab key="login" title="Iniciar sesión" className='felx flex-col justify-center items-center'>
                        <LoginForm onLogin={onLogin} />
                    </Tab>
                    <Tab key="register" title="Registrarse" className='felx flex-col justify-center items-center'>
                        <RegisterForm onRegister={onLogin} />
                    </Tab>
                  </Tabs>
                )}
            </ModalContent>
            <ModalFooter>
                <p className="text-red">{error}</p>
            </ModalFooter>
        </Modal>
        </>
    );
};

export default LoginMenu;