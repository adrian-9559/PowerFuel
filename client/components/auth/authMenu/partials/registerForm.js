// RegisterForm.js
import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dni, setDni] = useState('');
    const router = useRouter();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const user = {
                email: email,
                current_password: password,
                first_name: firstName,
                last_name: lastName,
                dni: dni
            };
            const response = await UserService.registerUser(user);
            console.log(response);
            if (response) {
                router.push('/');
            }
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    };

    return (
        <form
            onSubmit={handleRegister}
            className='flex flex-col w-full justify-between'
        >
            <div className='flex flex-row w-full gap-4 justify-center'>
                <div className="flex flex-col w-full">
                <Input
                    isRequired
                    type="email"
                    label="Email"
                    defaultValue={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-4"
                    autoComplete="username"
                />
                <Input
                    isRequired
                    type="password"
                    label="Password"
                    defaultValue={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-4"
                    autoComplete="current-password"
                />
                    <Input
                        isRequired
                        type="password"
                        label="Confirm Password"
                        defaultValue={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full mb-4"
                        autoComplete="new-password"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <Input
                        isRequired
                        type="text"
                        label="First Name"
                        defaultValue={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="text"
                        label="Last Name"
                        defaultValue={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full mb-4"
                    />
                    <Input
                        isRequired
                        type="text"
                        label="DNI"
                        defaultValue={dni}
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