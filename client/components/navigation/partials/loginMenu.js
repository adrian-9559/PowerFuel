// ProductImagesCarousel.js
import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, useDisclosure } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import UserService from '../../../services/userService';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../redux/userSlice';
import { setAdmin } from '../../../redux/adminSlice';
import roleService from '../../../services/roleService';



const LoginMenu = ({ onLogin }) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [credentials, setCredentials] = useState({email: '', password: ''});
    const [error, setError] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    

    useEffect(() => {
        let token;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
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

    const handleChange = (event) => {
        const {name, value} = event.target;
        setCredentials({...credentials, [name]: value});
    }

    return (
        <>
        <Button onClick={onOpen}>Iniciar sesión</Button>
            <Modal  backdrop='opaque' isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 justify-center items-center">Iniciar sesión</ModalHeader>
                    <ModalBody>
                    <form className="flex flex-col p-8  login-container items-center justify-center" onSubmit={handleLogin}>
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
                        <Button
                            type="submit" 
                            className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                        >
                            Iniciar sesión
                        </Button>
                        {error && <section className="mt-2 text-red-500">{error}</section>}
                        <Button 
                            color="none"
                            onClick={() => router.push('/users/register')} 
                            className="mt-3 mb-3 text-blue-500 cursor-pointer hover:text-blue-700"
                        >
                            ¿No tienes cuenta?
                        </Button>
                    </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default LoginMenu;