import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import RoleService from '@services/roleService';

const ADMIN_ACTIONS = {
    '99': [
        'usuarios',
        'roles',
        'productos',
        'categorias'
    ],
    '96': [ // managerAnalytics
        'usuarios',
        'roles',
        'productos',
        'categorias'
    ],
    '94': [ // managerOrder
        'productos',
        'categorias'
    ],
    '97': [
        'productos',
        'categorias'
    ],
    '95': [ // managerSupport
        'usuarios',
        'roles'
    ],
    '98': [
        "usaurios"
    ]
};

const SideMenuAdministrador = ({setComponentUse}) => {
    const [roleUser, setRoleUser] = useState();
    const { user, setUser, isLoggedIn} = useAppContext();
    
    useEffect(() => {
        RoleService.getUserRole()
            .then(role => {
                setRoleUser(role);
            }).catch(error => {
                console.error('Error getting user role:', error);
        });
    }, []);

    return (
        <nav className='h-full ml-5 mr-20 border-r border-gray-300 pt-4 w-80'>
            <section className='px-3'>
                <h1>Menú Administrador</h1>
            </section>
            <section className='px-5'>
                {ADMIN_ACTIONS[roleUser] && ADMIN_ACTIONS[roleUser].map((action, index) => (
                    <section className='hover:bg-slate-200 w-full items-center flex h-10 gap-3 cursor-pointer' key={index} onClick={() => setComponentUse(action)}>{action}</section>
                ))}
            </section>
        </nav>
    );
}

export default SideMenuAdministrador;