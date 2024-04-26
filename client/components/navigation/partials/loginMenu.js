import React, { useState, useEffect } from 'react';
import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { motion, AnimatePresence,  } from 'framer-motion';
import UserService from '../../../services/userService';

const LoginMenu = ({ onLogin }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [selected, setSelected] = useState('login');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = typeof window !== 'undefined' ? window.sessionStorage.getItem('token') : null;

        if (token) {
            onOpenChange(false);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const emailInput = email;
            const passwordInput = password;

            const token = await UserService.loginUser(emailInput, passwordInput);

            if (token) {
                onLogin(token);
            }
        } catch (error) {
            console.error(error);
            setError('Incorrect username or password');
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!email || !password || !firstName || !lastName || !dni) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        try {
            await UserService.registerUser(email, password, firstName, lastName, dni);
            router.push('/users/login');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const LoginForm = () => (
        <form
            onSubmit={handleLogin}
            className='flex flex-col w-full justify-between'
        >
            <div
                className='flex flex-col w-full justify-between'
            >
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    defaultValue={email}
                    className="w-full mb-4"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    defaultValue={password}
                    className="w-full mb-4"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Iniciar sesión'}</Button>
        </form>
    );

    const RegisterForm = () => (
        <form
            onSubmit={handleRegister}
            className='flex flex-col w-full justify-between'
        >
            <div className='flex flex-row w-full gap-4 justify-center'>
                <div className="flex flex-col w-full md:w-1/2">
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <Input
                        isRequired
                        type="text"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="text"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="text"
                        label="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="w-full mb-4"
                    />
                </div>
            </div>
            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Registrarse'}</Button>
        </form>
    );

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
                        <LoginForm />
                    </Tab>
                    <Tab key="sign-up" title="Registrarse" className='felx flex-col justify-center items-center'>
                        <RegisterForm />
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