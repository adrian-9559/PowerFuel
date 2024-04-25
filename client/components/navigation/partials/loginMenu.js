import React, { useState, useEffect } from 'react';
import { Button, Input, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tabs, Tab, useDisclosure } from "@nextui-org/react";
import { motion, AnimatePresence,  } from 'framer-motion';
import UserService from '../../../services/userService';

const LoginMenu = ({ onLogin }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const [selected, setSelected] = useState('login');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let token;
        if (typeof window !== 'undefined') {
            token = sessionStorage.getItem('token');
        }

        if (token) {
            onOpenChange(false);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const email = credentials.email;
            const password = credentials.password;
            const token = await UserService.loginUser(email, password);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCredentials({ ...credentials, [name]: value });
    }

    const LoginForm = () => (
        <motion.form 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
                    value={credentials.email}
                    onChange={handleChange}
                    className="w-full mb-4"
                />
                <Input
                    name="password"
                    type="password"
                    label="Password"
                    value={credentials.password}
                    onChange={handleChange}
                    className="w-full mb-4"
                />
            </div>
            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Iniciar sesión'}</Button>
        </motion.form>
    );

    const RegisterForm = () => (
        <motion.form
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleRegister} 
            className='flex flex-col w-full justify-between'
        >
            <div className='flex flex-row w-full gap-4 justify-center'>
                <div className="flex flex-col w-full md:w-1/2">
                    <Input
                        type="email"
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4"
                    />
                </div>
                <div className="flex flex-col w-full md:w-1/2">
                    <Input
                        type="text"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        type="text"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        type="text"
                        label="DNI"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        className="w-full mb-4"
                    />
                </div>
            </div>
            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Registrarse'}</Button>
        </motion.form>
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
        </Modal>
        </>
    );
};

export default LoginMenu;