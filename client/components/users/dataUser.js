import React, { useState, useEffect } from 'react';
import EditUserImage from '@components/users/editUserImage';
import UserImage from '@components/users/userImage';
import UserService from '@services/userService';
import { Input, Button, Image, Link , Skeleton, Card, Divider, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import useTitle from '@hooks/useTitle';

const DataUser = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser} = useAppContext();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useTitle('Mis Datos');

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await UserService.updateUser(user);
                if (!response) {
                    console.log('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }

    const handdleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const resetPasswordInputs = () => {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    const handlePasswordChange = (e, name) => {
        switch(name) {
            case 'oldPassword':
                setOldPassword(e.target.value);
                break;
            case 'newPassword':
                setNewPassword(e.target.value);
                break;
            case 'confirmPassword':
                setConfirmPassword(e.target.value);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setIsLoading(false);
    }, [user]);

    const changePassword = async () => {
        try {
            const response = await UserService.changePasswordUser(oldPassword, newPassword, confirmPassword);
            if (!response) {
                console.log('Error changing password');
            }else{
                resetPasswordInputs();
            }
        } catch (error) {
            console.error('Error changing password:', error.message);
        }
    }

    return (
        <main className='grid sm:p-10 w-64 sm:w-full gap-6 mx-auto'>
            <section className='flex flex-raw pb-5 gap-3 lg:gap-5 items-center'>
                <section className='rounded'>
                    <Skeleton isLoaded={!isLoading} className="rounded-full">
                        {user &&
                            <EditUserImage >
                                <UserImage user={user} className="rounded-full object-cover"/>
                            </EditUserImage>
                        }
                    </Skeleton>
                </section>
                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2 w-full sm:w-auto">
                    <p className="font-bold text-center sm:text-left">{user ? user.email : ''}</p>
                </Skeleton>
            </section>
            <section className='w-full grid gap-3 md:flex'>
                <section className='w-full flex flex-col gap-5'>
                    <Input type='text' className='w-full' value={user ? user.email : ''} onChange={handdleChange} disabled={!isEditing} label="Email:" name="email" />
                    <Input type='text' className='w-full' value={user ? user.first_name : ''} onChange={handdleChange} disabled={!isEditing} label="Nombre:" name="first_name" />
                    <Input type='text' className='w-full' value={user ? user.last_name : ''} onChange={handdleChange} disabled={!isEditing} label="Apellido:" name="last_name" />
                    <Input type='text' className='w-full' value={user ? user.dni : ''} onChange={handdleChange} disabled={!isEditing} label="DNI:" name="dni" />
                    <Button color={isEditing ? 'primary' : 'default'} onClick={toggleEdit} className='w-full'>{isEditing ? 'Guardar' : 'Editar'}</Button>
                </section>
                <Divider orientation='vertical' />
                <section className='w-full flex flex-col gap-5'>
                    <Card className='p-4'>
                        <CardHeader>
                            <h2 className='text-xl font-bold'>Cambiar Contraseña</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody className='grid gap-3'>
                            <Input type='password' className='w-full' value={oldPassword} onChange={(e) => handlePasswordChange(e, 'oldPassword')} label="Contraseña antigua:" name="oldPassword" />
                            <Input type='password' className='w-full' value={newPassword} onChange={(e) => handlePasswordChange(e, 'newPassword')} label="Contraseña nueva:" name="newPassword" />
                            <Input type='password' className='w-full' value={confirmPassword} onChange={(e) => handlePasswordChange(e, 'confirmPassword')} label="Confirmar contraseña :" name="confirmPassword" />
                        </CardBody>
                        <Divider />
                        <CardFooter className='justify-between'>
                            <Button color='primary' className='w-12 sm:w-32' disabled={newPassword !== confirmPassword} onClick={changePassword}>Cambiar</Button>
                            <Button color='default' className='w-12 sm:w-32' onClick={resetPasswordInputs}>Cancelar</Button>
                        </CardFooter>
                    </Card>
                </section>
            </section>
        </main>
    )
}

export default DataUser;