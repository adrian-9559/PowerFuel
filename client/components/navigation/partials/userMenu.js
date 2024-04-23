// UserMenu.js
import React from 'react';
import { useRouter } from 'next/router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, Image } from "@nextui-org/react";

const UserMenu = ({ userData, handleLogout, isAdmin }) => {
    const router = useRouter();

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button radius="full" size="lg" isIconOnly>
                    <Image className="object-cover h-full w-full" src='https://imgs.search.brave.com/q0dsGlGGXdT8ttbtcAuJB2NZ5jA9ZrdU5R_XIkta9wk/rs:fit:500:0:0/g:ce/aHR0cHM6Ly91cGxv/YWQud2lraW1lZGlh/Lm9yZy93aWtpcGVk/aWEvY29tbW9ucy9k/L2Q3L01hcmlhbm9f/UmFqb3lfaW5fMjAx/OC5qcGc'></Image>
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
                <DropdownItem key="profile" className="gap-2 h-14 bg-gray-200" textValue={userData.email} isDisabled>
                    <p className='font-bold'>Hola,</p>
                    <p className="font-bold">{userData.email}</p>
                </DropdownItem>
                <DropdownItem key="settings" textValue="Settings" onClick={() => router.push('/users/config')}>Configuración</DropdownItem>
                <DropdownItem key="team_settings" textValue="Delivered" showDivider>Pedidos</DropdownItem>
                
                {isAdmin === true ? (
                        <DropdownItem key="panel" textValue="panel" onClick={() => router.push('/admin/')}>
                            <p>Panel de Administración</p>
                        </DropdownItem>
                ) : null}
                <DropdownItem key="help_and_feedback" textValue="Help">Ayuda</DropdownItem>
                <DropdownItem key="logout" textValue="Logout" onClick={handleLogout} color="danger" className='bg-red-200'>
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