import React, { useState, useEffect } from 'react';
import { Input, Button, Image, Link } from "@nextui-org/react";
import UserService from '../../services/userService';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import SideMenu from '../../components/users/sideMenu';
import DefaultLayout from '../../layouts/default';
import UserImage from '../../components/users/userImage';
import { clearUser, setUser} from '../../redux/userSlice';
import { clearAdmin, setAdmin} from '../../redux/adminSlice';
import { useSelector, useDispatch } from 'react-redux';

const Config = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(state => state.user) || {};
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [userInfo, setUserInfo] = useState(user);
    

    const fetchUserInfo = async () => {
        setIsLoading(true);
        try {
            const userInfo = await UserService.getUserInfo(sessionStorage.getItem('token'));
            if(userInfo !== null && userInfo.user_id && userInfo.email && userInfo.first_name && userInfo.last_name && userInfo.dni){
                dispatch(setUser(userInfo));
            }
        } catch (error) {
            console.error('Ha ocurrido un error al obtener la información del usuario' ,error);
            dispatch(setUser(null));
        }
        setIsLoading(false);
    };

    const toggleEdit = async () => {
        setIsEditing(!isEditing);
        if(isEditing){
            try {
                const response = await UserService.updateUser(user.user_id, user.email, user.first_name, user.last_name, user.dni, user.role_id);
                if (!response) {
                    throw new Error('Error updating user');
                }
            } catch (error) {
                console.error('Error updating user:', error.message);
            }
        }
    }

    const handleChange = (field) => (e) => {
        setUserInfo({...user, [field]: e.target.value});
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            router.push('/');
        }
        fetchUserInfo();
    }, [user]);

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
                                    <Input type='text' className='w-full' defaultValue={user.email} onChange={handleChange('email')} disabled={!isEditing} label="Email:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.first_name} onChange={handleChange('first_name')} disabled={!isEditing} label="Nombre:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.last_name} onChange={handleChange('last_name')} disabled={!isEditing} label="Apellido:"></Input>
                                </section>
                                <section className='flex flex-col gap-3'>
                                    <Input type='text' className='w-full' defaultValue={user.dni} onChange={handleChange('dni')} disabled={!isEditing} label="DNI:"></Input>
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
