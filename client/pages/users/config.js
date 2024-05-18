import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '@context/AppContext';
import SideMenu from '@components/users/sideMenu';
import DataUser from '@components/users/dataUser';
import AddressList from '@components/users/address/addressList';
import PaymentList from '@components/users/payment/paymentList';

const Config = () => {
    const router = useRouter();
    const { user, setUser, isLoggedIn} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState('DataUser');

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn) {
                router.push('/');
            } else {
                setIsLoading(false);
            }
        }, 1000);
    
        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn, router]);

    return (
        <section className='flex h-full items-stretch'>
            <SideMenu setSelectedOption={setSelectedOption} />
            {selectedOption === 'DataUser' && <DataUser />}
            {selectedOption === 'AddressList' && <AddressList />}
            {selectedOption === 'PaymentList' && <PaymentList />}
        </section>
    );
}
export default Config;