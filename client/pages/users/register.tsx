import React, { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button } from "@nextui-org/react";
import UserService from '../../services/userService'; // Import userService

const Register = () => {
    const router = useRouter();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [dni, setDni] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault()
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

    return (
        <main className="flex items-center justify-center items-center h-screen bg-gray-200 main-container">
            <form className="flex flex-col p-8 bg-white rounded shadow-md login-container items-center justify-center" onSubmit={handleRegister}>
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
                {error && <div className="mt-2 text-red-500">{error}</div>}
                <Button
                    type="submit"
                    className="w-full px-4 py-2 mt-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </Button>
                <section className="flex flex-col justify-center items-center">
                    <p>Already have an account?</p>
                    <a href="/users/login" className="mt-3 mb-3 text-blue-500 cursor-pointer hover:text-blue-700">Log in</a>
                </section>
            </form>
        </main>
    );
};

export default Register;