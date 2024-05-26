// UserMenu.js
import React, { useEffect, useState } from 'react';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image, Spinner } from "@nextui-org/react";
import UserImage from '../../users/userImage';
import UserService from '@services/userService';
import RoleService from '@services/roleService';
import { useAppContext } from '@context/AppContext';
import { useRouter } from 'next/router';


const UserMenu = () => {
    const { user, isAdmin, isLoggedIn , setIsLoggedIn } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();


    const handleLogout = () => {
        sessionStorage.removeItem('token');
        setIsLoggedIn(false);
        router.push('/');
    };

    useEffect(() => {
        console.log('UserMenu', user);
    }, [user]);

    return (
        user === null || isLoading ? <Spinner size="large" /> :
            <Dropdown backdrop="blur">
                <DropdownTrigger>
                    <Button radius="full" size="lg" className='flex justify-center items-center pt-0' isIconOnly>
                        <UserImage user={user}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Profile Actions"
                    closeOnSelect={false}
                >
                    <DropdownItem key="profile" className='dark:bg-gray-800 dark:text-white dark:border-gray-800 dark:shadow-lg bg-gray-200 text-black border-gray-200 shadow-lg' textValue={user.email}>
                        <p className='font-bold'>Hola,</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="Settings" onClick={() => router.push('/users/config/DataUser')}>
                        Configuración
                    </DropdownItem>
                    <DropdownItem key="team_settings" textValue="Delivered" showDivider onClick={() => router.push('/users/config/OrderList')}>Pedidos</DropdownItem>
                    
                    {isAdmin ? (
                            <DropdownItem key="panel" textValue="panel" onClick={() => router.push('/admin/General')}>
                                <p>Panel de Administración </p>
                            </DropdownItem>
                    ) : null}
                    <DropdownItem key="help_and_feedback" textValue="Help" onClick={() => router.push('/web/Information')}>
                        Información
                    </DropdownItem>
                    <DropdownItem key="help_and_feedback" textValue="Help" onClick={() => router.push('/web/help')}>
                        Ayuda
                    </DropdownItem>
                    <DropdownItem key="logout" textValue="Logout" color="danger" className='bg-red-400' onClick={() => handleLogout()}>
                        <section className='flex justify-center space-x-1 items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                            </svg>
                            <p className='font-semibold'>Cerrar Sesión</p>
                        </section>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
    );
};

export default UserMenu;