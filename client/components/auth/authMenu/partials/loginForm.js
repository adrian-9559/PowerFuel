// LoginForm.js
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import UserService from '@services/userService';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const  { setIsLoggedIn } = useAppContext();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const emailInput = email;
            const passwordInput = password;

            const token = await UserService.loginUser(emailInput, passwordInput);
            sessionStorage.setItem('token', token);
            setIsLoggedIn(true);
            router.push('/');

        } catch (error) {
            console.error(error);
        }
    };

    return (
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
};

export default LoginForm;