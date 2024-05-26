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

import { useRouter } from 'next/router';

const NavigationBar = () => {
    const { isLoggedIn } = useAppContext();
    const router = useRouter();

    return (
        <header className="w-full mx-0 px-0 flex justify-center">
            <Navbar isBordered className='w-full h-20'>
                <NavbarContent justify='center' className='w-full'>
                    <SideMenu />
                    <NavbarItem  className="cursor-pointer mx-16" onClick={() => router.push('/')}>
                        <Image className="object-cover h-16 w-16"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/logo/logo.png`}
                            alt="logo"
                        />
                    </NavbarItem>
                    <NavbarItem className='w-full h-full flex flex-row items-center'>
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
        </header>
    );
};

export default NavigationBar;