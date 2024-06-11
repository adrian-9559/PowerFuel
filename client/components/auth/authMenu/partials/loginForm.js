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
    const [errors, setErrors] = useState({ email: '', password: '' });
    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const emailInput = email;
            const passwordInput = password;
            try {
                setLoading(true);
                await UserService.loginUser(emailInput, passwordInput);
                setIsLoggedIn(true);
                router.push('/');
              } catch (error) {
                console.error("Error during login: ", error);
                setIsLoggedIn(false);
              }
              
              setLoading(false);

        } catch (error) {
            console.error(error);
        }
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (!e.target.value) {
            setErrors({ ...errors, password: 'La contraseña es requerida.' });
        } else {
            setErrors({ ...errors, password: '' });
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (!e.target.value) {
            setErrors({ ...errors, email: 'El correo electrónico es requerido.' });
        } else if (!validateEmail(e.target.value)) {
            setErrors({ ...errors, email: 'El correo electrónico no es válido.' });
        } else {
            setErrors({ ...errors, email: '' });
        }
    };

    return (
        <section className="w-full grid gap-6 z-99">
            <form
                onSubmit={handleLogin}
                className='flex flex-col w-full justify-between gap-5'
            >
                    <Input
                        fullWidth
                        name="email"
                        type="email"
                        label="Email"
                        defaultValue={email}
                        autoComplete="email"
                        onChange={handleEmailChange}
                        isInvalid={errors.email ? true : false}
                        errorMessage={errors.email}
                    />
                    <Input
                        name="password"
                        type="password"
                        label="Password"
                        defaultValue={password}
                        onChange={handlePasswordChange}
                        isInvalid={errors.password ? true : false}
                        autoComplete="current-password"
                        errorMessage={errors.password}
                    />
                <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Iniciar sesión'}</Button>
            </form>
        </section>
    );
};

export default LoginForm;