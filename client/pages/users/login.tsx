import React, { FormEvent, ChangeEvent, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Input, Button } from "@nextui-org/react";
import UserService from '../../services/userService'; 

const Login = () => {
    const [credentials, setCredentials] = useState<{email: string, password: string}>({email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    
    const router = useRouter();

    useEffect(() => {
        let token;
        if (typeof window !== 'undefined') {
            token = localStorage.getItem('token');
        }
        if (token) 
            router.push('/');
    }, []);


    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const email = credentials.email;
            const password = credentials.password;
            const token = await UserService.loginUser(email, password);
            if (token) {
                localStorage.setItem('token', token);
                router.push('/');
            }
        } catch (error) {
            console.error(error);
            setError('Incorrect username or password');
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCredentials({...credentials, [e.target.name]: e.target.value});

    return (
        <main className="flex items-center justify-center items-center h-screen bg-gray-200 main-container">
            <form className="flex flex-col p-8 bg-white rounded shadow-md login-container items-center justify-center" onSubmit={handleLogin}>
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
        </main>
    );
};

export default Login;