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
        if (router.isReady) {
            const view = router.asPath.split('/')[2] || 'General';
            setComponentUse(view);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (ComponentUse) {
            router.replace(`/admin/${ComponentUse}`, undefined, { shallow: true });
        }
    }, [ComponentUse]);

    if (!ComponentUse) {
        return null;
    }

    return (
        <section className="h-full flex w-full gap-0">
            <SideMenuAdministrador setComponentUse={setComponentUse}/>
            <section className="w-full p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={ComponentUse}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        {components[ComponentUse]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    )
}

export default Administrador;