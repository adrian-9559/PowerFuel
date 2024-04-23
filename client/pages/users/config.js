import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Link } from "@nextui-org/react";
import { getUserInfo, updateUser } from '../../services/userService';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SideMenu from '../../components/users/sideMenu';

const Config = () => {
    const { navigate } = useRouter();
    const [userData, setUserData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        getUserInfo()
            .then(userInfo => {
                if(userInfo) {
                    setUserData(userInfo);
                }else {
                    navigate('/users/login');
                }
            })
            .catch(error => console.error('Authentication Error:', error.message));
    }, []);

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await updateUser(userData.user_id, userData.email, userData.first_name, userData.last_name, userData.dni, userData.role_id);
                if (!response) {
                    throw new Error('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }

    const handleChange = (field) => (e) => {
        setUserData({...userData, [field]: e.target.value});
    }

    return (
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
                            <Image
                                shadow="sm"
                                radius="full"
                                alt={userData.email}
                                className="object-cover h-16 w-16"
                                src='https://imgs.search.brave.com/q0dsGlGGXdT8ttbtcAuJB2NZ5jA9ZrdU5R_XIkta9wk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q3L01hcmlhbm9f/UmFqb3lfaW5fMjAx/OC5qcGc'
                            />
                            <p>{userData.email}</p>
                        </section>
                        <section className='flex flex-col gap-5 '>
                            <section className='flex flex-col gap-3'>
                                <Input type='text' className='w-full' value={userData.email} onChange={handleChange('email')} disabled={!isEditing} label="Email:"></Input>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Input type='text' className='w-full' value={userData.first_name} onChange={handleChange('first_name')} disabled={!isEditing} label="Nombre:"></Input>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Input type='text' className='w-full' value={userData.last_name} onChange={handleChange('last_name')} disabled={!isEditing} label="Apellido:"></Input>
                            </section>
                            <section className='flex flex-col gap-3'>
                                <Input type='text' className='w-full' value={userData.dni} onChange={handleChange('dni')} disabled={!isEditing} label="DNI:"></Input>
                            </section>
                            <Button color={isEditing? 'primary' : 'default'} onClick={toggleEdit} className='w-full'>{isEditing ? 'Guardar' : 'Editar'}</Button>
                        </section>
                </motion.section>
            </main>
        </section>
    );
}
export default Config;
