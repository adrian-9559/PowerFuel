import React from 'react';
import { useRouter } from 'next/router';
import { Button } from "@nextui-org/react";

const SideMenu = () => {
    const { navigate } = useRouter();

    return (
        <nav className='fixed h-full flex flex-col items-start border-r border-gray-300 pt-4 w-auto'>
            <section className='flex flex-row items-center px-3 gap-1 font-medium'>
                <p>Mi cuenta</p>
            </section>
            <section className='hover:bg-slate-200 w-full'>
                <Button 
                    color="none"
                    onClick={() => navigate('/users/config')} 
                    className='flex flex-row items-center px-3 gap-1'
                    startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                    }
                >

                    Mis datos
                </Button>
            </section>
            <section className='hover:bg-slate-200 w-full'>
                <Button
                    color="none"
                    onClick={() => navigate('/users/address')} 
                    className='flex flex-row items-center px-3 gap-1'
                    startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z" />
                        </svg>
                    }
                >
                    Mis direcciones
                </Button>
            </section>
            <section className='hover:bg-slate-200 w-full'>
                <Button 
                    color="none"
                    onClick={() => navigate('/users/payment')} 
                    className='flex flex-row items-center px-3 gap-1'
                    startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                        </svg>
                    }
                >
                    Mis tarjetas
                </Button>
            </section>
            <section className='hover:bg-slate-200 w-full'>
                <Button 
                    color="none"
                    onClick={() => navigate('/users/orders')} 
                    className='flex flex-row items-center px-3 gap-1'
                    startContent={
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    }
                >
                    Mis pedidos
                </Button>
            </section>
        </nav>
    );
};

export default SideMenu;