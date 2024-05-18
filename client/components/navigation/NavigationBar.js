import React, { useState, useCallback, useContext ,useEffect } from 'react';
import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Image } from "@nextui-org/react";
import { useAppContext } from "@context/AppContext";
import { ThemeSwitch } from '@components/theme-switch';
import SideMenu from '@components/navigation/partials/SideMenu';
import SearchBar from '@components/navigation/partials/SearchBar';
import UserMenu from '@components/navigation/partials/userMenu';
import CartMenu from '@components/navigation/partials/cartMenu';
import AuthMenu from '@components/auth/authMenu';
import NotificationMenu from '@components/navigation/partials/notificationMenu';

import { useRouter } from 'next/router';

const NavigationBar = () => {
    const { isLoggedIn, user } = useAppContext();
    const router = useRouter();

    return (
        <header className="w-full mx-auto px-0">
            <Navbar isBordered className='w-full mx-auto px-0'>
                <NavbarContent>
                    <SideMenu />
                </NavbarContent>
                <NavbarContent>
                    <NavbarBrand className="cursor-pointer" onClick={() => router.push('/')}>
                        <Image className="object-cover h-12 w-12"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/logo/logo.png`}
                            alt="logo"
                        />
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="w-96">
                    <SearchBar />
                </NavbarContent>
                <NavbarContent>
                    <CartMenu/>
                    {isLoggedIn &&
                        <NotificationMenu/>
                    }
                </NavbarContent>
                <NavbarItem>
                    <ThemeSwitch/>
                </NavbarItem>
                <NavbarContent as="section">
                    <NavbarItem>
                        {isLoggedIn ? 
                            (
                                <UserMenu/> 
                            ) : (
                                <AuthMenu/>
                            )
                        }
                    </NavbarItem>
                </NavbarContent>
            </Navbar>
            
        </header>
    );
};

export default NavigationBar;