import React, { useState } from 'react';
import { Button, Input } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const router = useRouter();
    const [formState, setFormState] = useState({
        email: '',
        current_password: '',
        confirm_new_password: '',
        first_name: '',
        last_name: '',
        dni: '',
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    const nameRegex = /^[A-Za-záéíóúÁÉÍÓÚñÑüÜ\s]+$/;
    const dniRegex = /^\d{8}[A-Za-z]$/;

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'email':
                if (!emailRegex.test(value)) error = 'El correo debe ser un correo válido (ejemplo: usuario@dominio.com)';
                break;
            case 'current_password':
                if (!passwordRegex.test(value)) error = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número';
                break;
            case 'confirm_new_password':
                if (value !== formState.current_password) error = 'Asegúrate de que las contraseñas sean iguales';
                break;
            case 'first_name':
                if (!nameRegex.test(value)) error = 'El nombre debe contener solo letras y espacios';
                break;
            case 'last_name':
                if (!nameRegex.test(value)) error = 'El apellido debe contener solo letras y espacios';
                break;
            case 'dni':
                if (!dniRegex.test(value)) error = 'El DNI debe contener solo números y tener 8 dígitos';
                break;
            default:
                break;
        }

        return error;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        let newErrors = {};

        for (let key in formState) {
            const error = validateField(key, formState[key]);
            if (error) newErrors[key] = error;
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            try {
                const user = {
                    email: formState.email,
                    current_password: formState.current_password,
                    first_name: formState.first_name,
                    last_name: formState.last_name,
                    dni: formState.dni
                };
                const response = await UserService.registerUser(user);
                if (response) {
                    router.reload();
                }
            } catch (error) {
                console.error(error);
            }
            setLoading(false);
        }
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        setFormState({ ...formState, [name]: value });

        const error = validateField(name, value);
        newErrors[name] = error;
        setErrors(newErrors);
    };

    return (
        <form
            onSubmit={handleRegister}
            className='flex flex-col w-full justify-between'
        >
            <div className='flex flex-row w-full gap-4 justify-center'>
                <div className="flex flex-col w-full">
                    <Input
                        name='email'
                        isRequired
                        type="email"
                        label="Email"
                        value={formState.email}
                        onChange={onChange}
                        className="w-full mb-4"
                        autoComplete="username"
                        isInvalid={!!errors.email}
                    />
                    <Input
                        name='current_password'
                        isRequired
                        type="password"
                        label="Password"
                        value={formState.current_password}
                        onChange={onChange}
                        className="w-full mb-4"
                        autoComplete="current-password"
                        isInvalid={!!errors.current_password}
                    />
                    <Input
                        name='confirm_new_password'
                        isRequired
                        type="password"
                        label="Confirm Password"
                        value={formState.confirm_new_password}
                        onChange={onChange}
                        className="w-full mb-4"
                        autoComplete="new-password"
                        isInvalid={!!errors.confirm_new_password}
                    />
                </div>
                <div className="flex flex-col w-full">
                    <Input
                        name='first_name'
                        isRequired
                        type="text"
                        label="First Name"
                        value={formState.first_name}
                        onChange={onChange}
                        className="w-full mb-4"
                        isInvalid={!!errors.first_name}
                    />
                    <Input
                        name='last_name'
                        isRequired
                        type="text"
                        label="Last Name"
                        value={formState.last_name}
                        onChange={onChange}
                        className="w-full mb-4"
                        isInvalid={!!errors.last_name}
                    />
                    <Input
                        name='dni'
                        isRequired
                        type="text"
                        label="DNI"
                        value={formState.dni}
                        onChange={onChange}
                        className="w-full mb-4"
                        isInvalid={!!errors.dni}
                    />
                </div>
            </div>
            <section>
                {Object.values(errors).find(error => error) && <p className='text-danger text-xs'>{Object.values(errors).find(error => error)}</p>}
            </section>
            <Button type='submit' disabled={loading} className="w-full">{loading ? 'Cargando...' : 'Registrarse'}</Button>
        </form>
    );
};

export default RegisterForm;
