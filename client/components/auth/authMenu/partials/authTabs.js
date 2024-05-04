import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { AnimatePresence, motion } from 'framer-motion';

const AuthTabs = () => {
    const [selectedTab, setSelectedTab] = useState('login');
    const [direction, setDirection] = useState(1);

    const handleTabChange = (newTab) => {
        setDirection(newTab === 'login' ? 1 : -1);
        setSelectedTab(newTab);
    };

    const pageVariants = {
        inRight: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        outRight: {
            opacity: 0,
            x: "100%",
            scale: 0.8,
        },
        inLeft: {
            opacity: 1,
            x: 0,
            scale: 1,
        },
        outLeft: {
            opacity: 0,
            x: "-100%",
            scale: 0.8,
        }
    };

    return (
    <section
        className='w-96 h-96 flex flex-col gap-4 justify-top items-center p-0 overflow-hidden'
    >
        <Tabs
            fullWidth
            aria-label="Admin Tabs"
            selectedKey={selectedTab}
            onSelectionChange={handleTabChange}
        >
            <Tab key="login" title="Iniciar sesión" className="w-full" />
            <Tab key="register" title="Registrarse" className="w-full" />
        </Tabs>
        <AnimatePresence 
          mode="sync"
        >
            {selectedTab === 'login' && (
                <motion.div
                    className='absolute top-24 left-16 right-16 w-auto h-auto flex flex-col gap-4 justify-center items-center p-0 overflow-hidden'
                    key="loginMotion"
                    initial="outLeft"
                    animate="inLeft"
                    exit="outLeft"
                    variants={pageVariants}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30, mass: 0.3 },
                        opacity: { duration: 0.1 } // Reduced duration
                    }}
                >
                    <h2 className='font-bold text-xl'>Iniciar sesión</h2>
                    <LoginForm />
                </motion.div>
            )}
            {selectedTab === 'register' && (
                <motion.div                      
                    className='absolute top-24 left-16 right-16 w-auto h-auto flex flex-col gap-4 justify-center items-center p-0 overflow-hidden'
                    key="registerMotion"
                    initial="outRight"
                    animate="inRight"
                    exit="outRight"
                    variants={pageVariants}
                    transition={{
                        x: { type: "spring", stiffness: 300, damping: 30, mass: 0.3 },
                        opacity: { duration: 0.1 } // Reduced duration
                    }}
                >
                    <h2 className='font-bold text-xl'>Registrarse</h2>
                    <RegisterForm />
                </motion.div>
            )}
        </AnimatePresence>
    </section>
);
};

export default AuthTabs;