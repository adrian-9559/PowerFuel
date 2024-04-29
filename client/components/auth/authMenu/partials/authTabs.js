import React, { useState } from 'react';
import { Tabs, Tab } from '@nextui-org/react';
import LoginForm from './loginForm';
import RegisterForm from './registerForm';

const AuthTabs = () => {
    const [selected, setSelected] = useState('login');

    return (
        <Tabs
            fullWidth
            size="md"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={setSelected}
        >
            <Tab key="login" title="Iniciar sesión" className='felx flex-col justify-center items-center'>
                <LoginForm/>
            </Tab>
            <Tab key="register" title="Registrarse" className='felx flex-col justify-center items-center'>
                <RegisterForm/>
            </Tab>
        </Tabs>
    );
};

export default AuthTabs;