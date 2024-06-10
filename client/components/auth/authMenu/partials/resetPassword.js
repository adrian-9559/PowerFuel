import React, { useState } from 'react';
import { Input, Button, Spinner } from '@nextui-org/react';
import { useRouter } from 'next/router';
import UserService from '@services/userService';

const resetPassword = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [codeSent, setCodeSent] = useState(false);
    const [codeVerified, setCodeVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try{
            if (!codeSent && email) {
                const emailInput = email;
                if (!emailInput || !validateEmail(emailInput)) {
                    console.error("El correo electrónico es requerido o no es válido.");
                    return;
                }
                try {
                    setLoading(true);
                    await UserService.getPasswordResetCode(emailInput);
                    setLoading(false);
                    setCodeSent(true);
                } catch (error) {
                    setCodeSent(false);
                    setIsLoading(false);
                    console.error("Error al enviar el correo de reseteo de contraseña: ", error);
                }
            } else if (!codeVerified){
                try{
                    setIsLoading(true);
                    await UserService.verifyPasswordResetCode(email, code);
                    setIsLoading(false);
                    setCodeVerified(true);
                } catch (error) {
                    setIsLoading(false);
                    console.error("Error al verificar el código de reseteo de contraseña", error);
                }
            } else if (codeVerified) {
                if (!passwordRegex.test(newPassword)) {
                    setIsLoading(false);
                    console.error("La contraseña no cumple con los requisitos.");
                    return;
                }
                try {
                    setIsLoading(true);
                    await UserService.resetPassword(email, code, newPassword, confirmPassword);
                    setIsLoading(false);
                    router.push('/');
                } catch (error) {
                    setIsLoading(false);
                    console.error("Error al resetear la contraseña", error);
                }
            }
        }catch(err){
            
            setIsLoading(false);
            console.error(err);
        }
    };

    const renderFormContent = () => {
        if (isLoading) {
            return <Spinner />;
        } else if (!codeSent && !email) {
            return (
                <Input 
                    className="w-full mt-16"
                    type="email" 
                    label="Correo Electrónico de recuperación"
                    onChange={(e) => setEmail(e.target.value)}
                    errorMessage="El correo electrónico es requerido o no es válido."
                    isInvalid={!validateEmail(email)}
                />
            );
        } else if (!codeVerified) {
            return (
                <>
                    <Input 
                        className="w-full mt-16"
                        type="number" 
                        label="Código de verificación"
                        defaultValue={""}
                        onChange={(e) => setCode(e.target.value)}
                        errorMessage="El código de verificación es requerido."
                        isInvalid={code.length === 0}
                    />
                    <Button type='button' onClick={(e) => {setCodeSent(false); handleResetPassword(e);}} className="w-full">
                        Enviar de nuevo
                    </Button>
                </>
            );
        } else {
            return (
                <>
                    <Input 
                        type="password" 
                        label="Nueva contraseña"
                        onChange={(e) => setNewPassword(e.target.value)}
                        isInvalid={!passwordRegex.test(newPassword)}
                        errorMessage="La contraseña no cumple con los requisitos. Tiene que tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número."
                    />
                    <Input 
                        type="password" 
                        label="Confirmar nueva contraseña"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        errorMessage="Las contraseñas no coinciden."
                        isInvalid={newPassword !== confirmPassword || confirmPassword.length === 0}
                    />
                </>
            );
        }
    };

    return (
        <section className="w-full">
            <form 
                className="w-full flex flex-col gap-4"
                onSubmit={handleResetPassword}
            >
                {renderFormContent()}
                <Button type='submit' disabled={isLoading} className="w-full">{isLoading ? 'Cargando...' : 'Enviar'}</Button>
            </form>
        </section>
    );
};

export default resetPassword;

    
