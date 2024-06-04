import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import UserService from '@services/userService';

const resetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try{
            if (!codeSent) {
                const emailInput = email;
                try {
                    await UserService.resetPassword(emailInput);
                    setCodeSent(true);
                } catch (error) {
                    console.error("Error during login: ", error);
                }
            } else {
                // Handle code verification here
            }
        }catch(err){
            console.error(err);
        }
    };

    return (
        <section className="w-full grid gap-6 items-center">
            <section className="w-full">
                <form 
                    className="w-full grid gap-4"
                    onSubmit={handleResetPassword}
                >
                    {!codeSent ? (
                        <Input 
                            type="email" 
                            label="Correo Electrónico de recuperación"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    ) : (
                        <Input 
                            type="text" 
                            label="Código de verificación"
                            onChange={(e) => setCode(e.target.value)}
                        />
                    )}
                    <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Enviar'}</Button>
                </form>
            </section>
        </section>
    );
};

export default resetPassword;