// UserMenu.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image, Spinner } from "@nextui-org/react";
import { useSelector, useDispatch } from 'react-redux';
import { clearUser, setUser} from '../../../redux/userSlice';
import { clearAdmin, setAdmin} from '../../../redux/adminSlice';
import UserImage from '../../users/userImage';
import UserService from '../../../services/userService';
import RoleService from '../../../services/roleService';


const UserMenu = ({onLogout}) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const admin = useSelector(state => state.admin);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchUserInfo();
        fetchUserRole();
    }, []);

    const handleLogout = () => {
        try {
            onLogout();
            setIsLoading(true);
            dispatch(clearUser());
            dispatch(clearAdmin());
        } catch (error) {
            console.error('Cierre de sesión fallido:', error);
        }
    };

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
    
    const fetchUserRole = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const userRole = await RoleService.getUserRole(token);
            console.log(userRole);
            if(userRole !== null)
                dispatch(setAdmin(userRole !== 10));
            else
                dispatch(setAdmin(false));
        } catch (error) {
            console.error('Ha ocurrido un error al obtener el rol del usuario', error);
        }
    };


    return (
        user === null || isLoading ? <Spinner size="large" /> :
            <Dropdown>
                <DropdownTrigger>
                    <Button radius="full" size="lg" className='flex justify-center items-center pt-0' isIconOnly>
                        <UserImage user={user}/>
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Profile Actions"
                    closeOnSelect={false}
                >
                    <DropdownItem key="profile" className="gap-2 h-14 bg-gray-200" textValue={user.email}>
                        <p className='font-bold'>Hola,</p>
                        <p className="font-bold">{user.email}</p>
                    </DropdownItem>
                    <DropdownItem key="settings" textValue="Settings" onClick={() => router.push('/users/config')}>
                        Configuración
                    </DropdownItem>
                    <DropdownItem key="team_settings" textValue="Delivered" showDivider>Pedidos</DropdownItem>
                    
                    {admin === true ? (
                            <DropdownItem key="panel" textValue="panel" onClick={() => router.push('/admin/')}>
                                <p onClick={() => router.push('/admin/')}>Panel de Administración </p>
                            </DropdownItem>
                    ) : null}
                    <DropdownItem key="help_and_feedback" textValue="Help">
                        Ayuda
                    </DropdownItem>
                    <DropdownItem key="logout" textValue="Logout" color="danger" className='bg-red-200' onClick={() => handleLogout()}>
                        <section className='flex justify-center space-x-1 '>
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