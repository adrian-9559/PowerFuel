// RegisterForm.js
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import UserService from '@services/userService';
import { useAppContext } from '@context/AppContext';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const { router } = useAppContext();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const user = {
                email,
                password,
                confirmPassword,
                firstName,
                lastName,
                dni
            };
            const response = await UserService.registerUser(user);
            if (response) {
                router.push('/login');
            }
        } catch (error) {
            console.error(error);
            setError('Error registering user');
        }
        setLoading(false);
    };

    return (
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
                    autoComplete="username"
                />
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4"
                    autoComplete="current-password"
                />
                    <Input
                        isRequired
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4"
                        autoComplete="new-password"
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

};

export default RegisterForm;