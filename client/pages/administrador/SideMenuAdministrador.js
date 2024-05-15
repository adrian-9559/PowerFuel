import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import {Button} from '@nextui-org/react';
import ArrowIcon from '@icons/ArrowIcon';

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
        <nav className='py-4 w-64'>
            <ul 
                className="flex flex-col items-center gap-1 w-full"
            >
                <li className="w-full">
                    <h1 className="font-bold w-full px-8">Menú Administrador</h1>
                </li>
                
                {ADMIN_ACTIONS[roleUser] && ADMIN_ACTIONS[roleUser].map((action, index) => (
                    <li className="w-full p-0" key={index}>
                        <Button 
                            radius="none" variant="light" className='w-full cursor-pointer justify-start text-start' key={index} onClick={() => setComponentUse(action)}
                            startContent={<ArrowIcon/>} // Mostrar el icono sólo si hoveredIndex es igual al índice del botón
                        >
                            {action}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default SideMenuAdministrador;