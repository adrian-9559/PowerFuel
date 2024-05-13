import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import RoleService from '@services/roleService';

const ADMIN_ACTIONS = {
    '99': [
        'Administración General',
        'Usuarios',
        'Roles',
        'Productos',
        'Categorías',
        'Rendimiento del Servidor',
    ],
    '96': [ // managerAnalytics
        'Administración General',
        'Usuarios',
        'Roles',
        'Productos',
        'Categorías'
    ],
    '94': [ // managerOrder
        'Administración General',
        'Productos',
        'Categorías'
    ],
    '97': [
        'Administración General',
        'Productos',
        'Categorías'
    ],
    '95': [ // managerSupport
        'Administración General',
        'Usuarios',
        'Roles'
    ],
    '98': [
        'Administración General',
        "Usuarios"
    ]
};

const SideMenuAdministrador = ({ComponentUse, setComponentUse}) => {
    const [roleUser, setRoleUser] = useState();
    const { user, setUser, isLoggedIn} = useAppContext();
    

    useEffect(() => {
        if (isLoggedIn && user) {
            setRoleUser(user.role_id);
        }
    },[isLoggedIn, user]);

    return (
        <nav className='h-full border-r border-gray-300 pt-4 w-56 pb-96'>
            <section className="flex flex-col justify-center gap-1">
                <h1 className="font-bold px-5">Menú Administrador</h1>
                {ADMIN_ACTIONS[roleUser] && ADMIN_ACTIONS[roleUser].map((action, index) => (
                    <section className='hover:bg-gray-200 dark:hover:bg-blue-800 w-full items-center flex h-10 cursor-pointer px-5' key={index} onClick={() => setComponentUse(action)}>{action}</section>
                ))}
            </section>
        </nav>
    );
}

export default SideMenuAdministrador;