import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import { useAppContext } from '@context/AppContext';
import SideMenu from '@components/users/sideMenu';
import DataUser from '@components/users/dataUser';
import AddressList from '@components/address/addressList';
import PaymentList from '@components/users/payment/paymentList';
import OrderList from '@components/orders/orderList';

const Config = () => {
    const router = useRouter();
    const routerRef = useRef(router);
    const { user, setUser, isLoggedIn} = useAppContext();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);

    const components = {
        'DataUser': <DataUser />,
        'AddressList': <AddressList />,
        'PaymentList': <PaymentList />,
        'OrderList': <OrderList />,
    };

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn) {
                console.log("El q me importa:" , isLoggedIn);
                routerRef.current.push('/'); // Usar la referencia en lugar de router directamente
            } else {
                setIsLoading(false);
            }
        }, 1000);
    
        if (routerRef.current.isReady) { // Usar la referencia en lugar de router directamente
            const view = routerRef.current.asPath.split('/')[3] || 'DataUser';
            setSelectedOption(view);
        }
    
        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn]);

    useEffect(() => {
        if (selectedOption) {
            routerRef.current.replace(`/users/config/${selectedOption}`, undefined, { shallow: true }); // Usar la referencia en lugar de router directamente
        }
    }, [selectedOption]);


    if (!selectedOption) {
        return null;
    }

    return (
        <section className='flex h-full items-stretch w-auto'>
            <SideMenu setSelectedOption={setSelectedOption} />
            <section className="w-full p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedOption}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {components[selectedOption]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    );
}
export default Config;