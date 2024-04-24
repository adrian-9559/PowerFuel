import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Button, Image } from "@nextui-org/react";

import UserService from '../../services/userService';
import { getUserRole } from '../../services/roleService';

import { ThemeSwitch } from '../../components/theme-switch';
import SideMenu from '../../components/navigation/partials/SideMenu';
import SearchBar from '../../components/navigation/partials/SearchBar';
import UserMenu from './partials/userMenu';
import CartMenu from './partials/cartMenu';
import LoginMenu from './partials/loginMenu';

const NavigationBar = () => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
    };

    const handleLogout = useCallback(() => {
        localStorage.clear();
        setIsLoggedIn(false);
    });
    
    return (
        <header>
            <Navbar isBordered className='flex flex-wrap items-center justify-center'>
                <NavbarContent>
                    <SideMenu />
                </NavbarContent>
                <NavbarContent>
                    <NavbarBrand className="mr-4 cursor-pointer" onClick={() => router.push('/')}>
                        <Image className="object-cover h-12 w-12"
                            src="http://localhost:4001/public/images/logo/logo.png"
                        />
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent>
                    <SearchBar />
                </NavbarContent>
                <NavbarContent>
                    <CartMenu/>
                </NavbarContent>
                <NavbarItem>
                    <ThemeSwitch/>
                </NavbarItem>
                <NavbarContent as="section">
                    <NavbarItem>
                        {isLoggedIn ? 
                            (
                                <UserMenu onLogout={handleLogout}/> 
                            ) : (
                                <LoginMenu onLogin={handleLogin}/>
                            )
                        }
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            
        </header>
    );
};

export default NavigationBar;