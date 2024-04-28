import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Link } from "@nextui-org/react";
import UserService from '@services/userService';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SideMenu from '@components/users/sideMenu';
import DefaultLayout from '@layouts/default';
import UserImage from '@components/users/userImage';
import { userAppContext } from '@context/userAppContext';

const Config = () => {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {user, setUser} = userAppContext();
    const [email , setEmail] = useState(user.email);
    const [first_name , setFirst_name] = useState(user.first_name);
    const [last_name , setLast_name] = useState(user.last_name);
    const [dni , setDni] = useState(user.dni);


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
        user.email = email;
        user.first_name = first_name;
        user.last_name = last_name;
        user.dni = dni;
        setUser(user);

    }
    , [email, first_name, last_name, dni]);

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
                            <section className='flex flex-row items-center gap-3'>
                                <section className="w-16 h-16">
                                    <UserImage user={user}/>
                                </section>
                                <p>{user.email}</p>
                            </section>
                            <section className='flex flex-col gap-5 '>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.email} onChange={setEmail(e.target.value)} disabled={!isEditing} label="Email:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.first_name} onChange={setFirst_name(e.target.value)} disabled={!isEditing} label="Nombre:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.last_name} onChange={setLast_name(e.target.value)} disabled={!isEditing} label="Apellido:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.dni} onChange={setDni(e.target.value)} disabled={!isEditing} label="DNI:"></Input>
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
