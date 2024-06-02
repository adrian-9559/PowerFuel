import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import {Button} from '@nextui-org/react';
import UserIcon from '@icons/UserIcon';

const ADMIN_ACTIONS = {
    '99': [
        'General',
        'Usuarios',
        'Roles',
        'Productos',
        'Categorias',
        'Dashboard',
    ],
    '96': [ // managerAnalytics
        'General',
        'Usuarios',
        'Roles',
        'Productos',
        'Categorias'
    ],
    '94': [ // managerOrder
        'General',
        'Productos',
        'Categorias'
    ],
    '97': [
        'General',
        'Productos',
        'Categorias'
    ],
    '95': [ // managerSupport
        'General',
        'Usuarios',
        'Roles'
    ],
    '98': [
        'General',
        "Usuarios"
    ]
};

const SideMenuAdministrador = ({ setSelectedOption }) => {
    const { user} = useAppContext();
    const [roleUser, setRoleUser] = useState(user?.role_id);
    

    useEffect(() => {
        if (user)
            setRoleUser(user.role_id);
    },[user]);

    return (
        <nav className='py-4 w-64 h-[54rem] border-r-1 border-default-250'>
            <ul 
                className="flex flex-col items-center gap-1 w-full"
            >
                <li className="w-full">
                    <h1 className="font-bold w-full px-8">Menú Administrador</h1>
                </li>
                
                {ADMIN_ACTIONS[roleUser] && ADMIN_ACTIONS[roleUser].map((action, index) => (
                    <li className="w-full p-0" key={index}>
                        <Button 
                            radius="none" variant="light" className='w-full cursor-pointer justify-start text-start' key={index} onClick={() => setSelectedOption(action)}
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