import React, { useState, useEffect, useRef } from 'react';
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
    const routerRef = useRef(router); // Crear una referencia para router
    const { user, isLoggedIn, isAdmin} = useAppContext();
    const [ComponentUse, setComponentUse] = useState(null);

    const components = {
        'General': <GeneralAdministration />,
        'Usuarios': <UserAdministration />,
        'Roles': <RoleAdministration />,
        'Productos': <ProductoAdministration />,
        'Categorias': <CategoryAdministration />,
        'Dashboard': <ServerRendimiento />
    };

    useEffect(() => {
        if (routerRef.current.isReady) { // Usar la referencia en lugar de router directamente
            const view = routerRef.current.asPath.split('/')[2] || 'General';
            setComponentUse(view);
        }
    }, [routerRef.current.isReady]);

    useEffect(() => {
        if (ComponentUse) {
            routerRef.current.replace(`/admin/${ComponentUse}`, undefined, { shallow: true }); // Usar la referencia en lugar de router directamente
        }
    }, [ComponentUse]);

    if (!ComponentUse) {
        return null;
    }

    return (
        <section className="h-full flex w-full gap-0">
            <SideMenuAdministrador setComponentUse={setComponentUse}/>
            <section className='w-full p-8 h-full'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={ComponentUse}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className='w-full h-full'
                    >
                        {components[ComponentUse]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    )
}

export default Administrador;