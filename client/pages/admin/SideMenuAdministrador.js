import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import { Button, Select, SelectItem, Divider } from '@nextui-org/react';

const ADMIN_ACTIONS = {
    '99': ['General', 'Usuarios', 'Roles', 'Productos', 'Categorias', 'Pedidos', 'Marcas'],
    '96': ['General', 'Usuarios', 'Roles', 'Pedidos', 'Productos', 'Categorias'],
    '94': ['General', 'Productos', 'Categorias', 'Pedidos', 'Marcas'],
    '97': ['General', 'Productos', 'Pedidos', 'Categorias'],
    '95': ['General', 'Usuarios', 'Roles'],
    '98': ['General', "Usuarios"]
};

const SideMenuAdministrador = ({ setSelectedOption }) => {
    const { user } = useAppContext();
    const [roleUser, setRoleUser] = useState(user?.role_id);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (user) {
            setRoleUser(user.role_id);
        }

        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [user]);

    const handleSelectChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <nav className='py-4 sm:w-64 h-full border-r flex flex-col items-center lg:items-start'>
        <div className="w-full px-4">
            <h1 className="font-bold text-xl text-center py-4 border-b border-gray-300">Menú Administrador</h1>
            {isMobile ? (
                <Select
                    className="w-full mt-4"
                    placeholder="Selecciona una opción"
                    onChange={(e) => handleSelectChange(e.target.value)}
                >
                    {ADMIN_ACTIONS[roleUser]?.map((action, index) => (
                        <SelectItem key={index} onClick={() => setSelectedOption(action)}>
                            {action}
                        </SelectItem>
                    ))}
                </Select>
            ) : (
                <ul className="flex flex-col items-center gap-2 w-full mt-4 h-full">
                    {ADMIN_ACTIONS[roleUser]?.map((action, index) => (
                        <li className="w-full" key={index}>
                            <Button 
                                radius="sm" variant="light" className='w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100' onClick={() => setSelectedOption(action)}
                            >
                                {action}
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </nav>
    );
}

export default SideMenuAdministrador;
