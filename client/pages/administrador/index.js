import React, { useState, useEffect } from 'react';
import { useAppContext } from '@context/AppContext';
import RoleService from '@services/roleService';
import {Card} from '@nextui-org/react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import GeneralAdministration from './generalAdministration';
import SideMenuAdministrador from "./SideMenuAdministrador";
import UserAdministration from "./userAdministration";
import RoleAdministration from "./roleAdministration";
import ProductoAdministration from "./productAdministration";
import CategoryAdministration from "./categoryAdministration";
import ServerRendimiento from "./serverRendimiento";

const Administrador = () => {
    const router = useRouter();
    const { query: { view }, push } = router;
    let defaultView = view ?? 'Administración General';
    const { user, isLoggedIn, isAdmin} = useAppContext();
    const [ComponentUse, setComponentUse] = useState(defaultView);

    useEffect(() => {
        const checkLoginStatus = setTimeout(() => {
            if (!isLoggedIn || !isAdmin || !user || user.role_id === 10) {
                push('/');
            }
        }, 1000);
    
        setComponentUse(view ?? 'Administración General');
        console.log('view', view);
        return () => clearTimeout(checkLoginStatus);
    }, [isLoggedIn, isAdmin, user, view, push]);



    return (
        <section className="h-full flex w-full gap-8">
            <Card radius="none">
                <SideMenuAdministrador setComponentUse={setComponentUse}/>
            </Card>
            <section className="w-full mr-8 my-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={ComponentUse}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {ComponentUse === 'Administración General' && <GeneralAdministration/>}
                        {ComponentUse === 'Usuarios' && <UserAdministration/>}
                        {ComponentUse === 'Roles' && <RoleAdministration/>}
                        {ComponentUse === 'Productos' && <ProductoAdministration/>}
                        {ComponentUse === 'Categorías' && <CategoryAdministration/>}
                        {ComponentUse === 'Rendimiento del Servidor' && <ServerRendimiento/>}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    )
}

export default Administrador;