import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Navbar, NavbarContent, NavbarItem, NavbarBrand, Image } from "@nextui-org/react";
import { useAppContext } from '@context/AppContext';
import { ThemeSwitch } from '@components/theme-switch';
import SideMenu from '@components/navigation/partials/SideMenu';
import SearchBar from '@components/navigation/partials/SearchBar';
import UserMenu from '@components/navigation/partials/userMenu';
import CartMenu from '@components/navigation/partials/cartMenu';
import AuthMenu from '@components/auth/authMenu';
import NotificationMenu from '@components/navigation/partials/notificationMenu';
import BrandLogo from '@icons/BrandLogo';

import { useRouter } from 'next/router';

const NavigationBar = () => {
    const { isLoggedIn } = useAppContext();
    const router = useRouter();
    return (
        <Navbar isBordered className='w-full flex items-center py-4'>
            <NavbarContent className='w-full flex flex-row'>
                <SideMenu />
                <NavbarItem className="cursor-pointer " onClick={() => router.push('/')}>
                    <BrandLogo />
                </NavbarItem>
                <NavbarItem className='flex-grow w-full h-full flex flex-row items-center'>
                    <SearchBar />
                </NavbarItem>
                <NavbarItem className='h-full flex flex-row items-center'>
                    <CartMenu />
                </NavbarItem>
                {isLoggedIn &&
                    <NavbarItem className='h-full flex flex-row items-center'>
                        <NotificationMenu />
                    </NavbarItem>
                }
                <NavbarItem className='h-full flex flex-row items-center'>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className='h-full flex flex-row items-center'>
                    {isLoggedIn ?
                        (
                            <UserMenu />
                        ) : (
                            <AuthMenu />
                        )
                    }
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default NavigationBar;