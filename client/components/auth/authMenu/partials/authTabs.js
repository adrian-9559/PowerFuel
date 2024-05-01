import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';
import { AnimatePresence, motion } from 'framer-motion';

const AuthTabs = () => {
    const [selectedTab, setSelectedTab] = useState('login');

    return (
        <section
            className='w-96 h-auto flex flex-col justify-center items-center p-0'
        >
            <Tabs
                fullWidth
                aria-label="Admin Tabs"
                selectedKey={selectedTab}
                onSelectionChange={setSelectedTab}
            >
                <Tab key="login" title="Iniciar sesión" className="w-full">
                    <AnimatePresence mode='wait'>
                        {selectedTab === 'login' && (
                            <motion.div
                                key="loginMotion"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <LoginForm/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Tab>
                <Tab key="register" title="Registrarse" className="w-full">
                    <AnimatePresence mode='wait'>
                        {selectedTab === 'register' && (
                            <motion.div
                                key="registerMotion"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <RegisterForm/>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Tab>
            </Tabs>
        </section>
    );
};

export default AuthTabs;