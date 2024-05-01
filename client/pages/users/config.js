import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Link , Skeleton, Badge } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SideMenu from '@components/users/sideMenu';
import DefaultLayout from '@layouts/default';
import UserImage from '@components/users/userImage';
import { useAppContext } from '@context/AppContext';
import EditUserImage from '@components/users/editUserImage';

const Config = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { user, setUser, isLoggedIn} = useAppContext();
    const [email , setEmail] = useState();
    const [first_name , setFirst_name] = useState();
    const [last_name , setLast_name] = useState();
    const [dni , setDni] = useState();

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await UserService.updateUser(user);
                if (!response) {
                    throw new Error('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }

    useEffect(() => {
        if (user) {
            if (user.email !== email) {
                setEmail(user.email);
            }
            if (user.first_name !== first_name) {
                setFirst_name(user.first_name);
            }
            if (user.last_name !== last_name) {
                setLast_name(user.last_name);
            }
            if (user.dni !== dni) {
                setDni(user.dni);
            }
        }
        setIsLoading(false);
    }, [user]);

    const handdleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn) {
                console.log("El q me importa:" , isLoggedIn);
                router.push('/');
            } else {
                setIsLoading(false);
            }
        }, 1000);
    

        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn]);
    return (
        <DefaultLayout>
            <section>
                <SideMenu />
                <main className='w-full flex flex-row justify-center pt-6'>
                    <motion.section
                        className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-xl w-2/5 flex flex-col gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <section className='flex flex-row items-center gap-3 px-10'>
                        <section className="w-16 h-16 ">
                            <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                {user && 
                                    <EditUserImage>
                                        <UserImage user={user}/>
                                    </EditUserImage>
                                }
                            </Skeleton>
                        </section>
                            <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                <p>{email}</p>
                            </Skeleton>
                        </section>
                        <section className='flex flex-col gap-5 '>
                            <section className='flex flex-col gap-3'>
                                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                    <Input type='text' className='w-full' value={email} onChange={(e)=>handdleChange(e)} disabled={!isEditing} label="Email:"></Input>
                                </Skeleton>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                    <Input type='text' className='w-full' value={first_name} onChange={(e)=>handdleChange(e)} disabled={!isEditing} label="Nombre:"></Input>
                                </Skeleton>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                    <Input type='text' className='w-full' value={last_name} onChange={(e)=>handdleChange(e)} disabled={!isEditing} label="Apellido:"></Input>
                                </Skeleton>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Skeleton isLoaded={!isLoading} className="rounded-lg h-auto py-2">
                                    <Input type='text' className='w-full' value={dni} onChange={(e)=>handdleChange(e)} disabled={!isEditing} label="DNI:"></Input>
                                </Skeleton>
                            </section>
                            <Button color={isEditing? 'primary' : 'default'} onClick={toggleEdit} className='w-full'>{isEditing ? 'Guardar' : 'Editar'}</Button>
                        </section>
                    </motion.section>
                </main>
            </section>
        </DefaultLayout>
    );
}
export default Config;