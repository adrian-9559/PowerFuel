import React, { useState, useEffect } from 'react';
import { Button, Select, SelectItem } from '@nextui-org/react';
import UserIcon3 from '@icons/UserIcon3';
import IdentifyTargetIcon from '@icons/IdentifyTargetIcon';
import NotificationIcon from '@icons/NotificationIcon';
import OrderIcon from '@icons/OrderIcon';

const SideMenu = ({ setSelectedOption }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 640);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <nav className='py-4 w-full sm:max-w-64 h-full flex flex-col items-center lg:items-start'>
            <div className="w-full ">
                <h1 className="font-bold text-xl text-center py-4 border-b border-gray-300">Mi cuenta</h1>
                {isMobile ? (
                    <section className='w-64 flex justify-center mx-auto'>
                        <Select
                            className="w-full mt-4"
                            placeholder="Selecciona una opción"
                            value="DataUser"
                        >
                            <SelectItem value="DataUser" onClick={() => setSelectedOption('DataUser')} startContent={<UserIcon3/>}>Mis datos</SelectItem>
                            <SelectItem value="AddressList" onClick={() => setSelectedOption('AddressList')} startContent={<IdentifyTargetIcon/>}>Mis direcciones</SelectItem>
                            <SelectItem value="NotificationList" onClick={() => setSelectedOption('NotificationList')} startContent={<NotificationIcon/>}>Mis notificaciones</SelectItem>
                            <SelectItem value="OrderList" onClick={() => setSelectedOption('OrderList')} startContent={<OrderIcon/>}>Mis pedidos</SelectItem>
                        </Select>
                    </section>
                ) : (
                    <ul className="flex flex-col items-center gap-2 w-full mt-4 h-full">
                        <li className="w-full">
                            <Button 
                                radius="sm" variant="light" 
                                className='w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105'
                                onClick={() => setSelectedOption('DataUser')}
                            >
                                <UserIcon3 />
                                Mis datos
                            </Button>
                        </li>
                        <li className="w-full">
                            <Button 
                                radius="sm" variant="light" 
                                className='w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105'
                                onClick={() => setSelectedOption('AddressList')}
                            >
                                <IdentifyTargetIcon />
                                Mis direcciones
                            </Button>
                        </li>
                        <li className="w-full">
                            <Button 
                                radius="sm" variant="light" 
                                className='w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105'
                                onClick={() => setSelectedOption('NotificationList')}
                            >
                                <section className='w-1/12 flex justify-center'>
                                    <NotificationIcon />
                                </section>
                                Mis notificaciones
                            </Button>
                        </li>
                        <li className="w-full">
                            <Button 
                                radius="sm" variant="light" 
                                className='w-full cursor-pointer justify-start text-start py-2 px-4 hover:bg-gray-100 transition-all duration-200 transform hover:scale-105'
                                onClick={() => setSelectedOption('OrderList')}
                            >
                                <OrderIcon />
                                Mis pedidos
                            </Button>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default SideMenu;
