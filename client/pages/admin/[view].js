import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import GeneralAdministration from './generalAdministration';
import SideMenuAdministrador from "./SideMenuAdministrador";
import UserAdministration from "./userAdministration";
import RoleAdministration from "./roleAdministration";
import ProductoAdministration from "./productAdministration";
import CategoryAdministration from "./categoryAdministration";
import BrandAdministration from './brandAdministration';
import ServerRendimiento from "./serverRendimiento";

const Administrador = () => {
    const router = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);

    const components = {
        'General': <GeneralAdministration />,
        'Usuarios': <UserAdministration />,
        'Roles': <RoleAdministration />,
        'Productos': <ProductoAdministration />,
        'Categorias': <CategoryAdministration />,
        'Dashboard': <ServerRendimiento />,
        'Marcas': <BrandAdministration />
    };

    useEffect(() => {
        if (router.isReady) { 
            const view = router.asPath.split('/')[2] || 'General';
            setSelectedOption(view);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (selectedOption && router.asPath.split('/')[2] !== selectedOption) {
            router.replace(`/admin/${selectedOption}`, undefined, { shallow: true }); 
        }
    }, [selectedOption, router]);

    if (!selectedOption) {
        return null;
    }

    return (
        <section className="h-full flex w-full gap-0">
            <SideMenuAdministrador setSelectedOption={setSelectedOption}/>
            <section className='w-full p-8 h-full'>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedOption}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className='w-full h-full'
                    >
                        {components[selectedOption]}
                    </motion.div>
                </AnimatePresence>
            </section>
        </section>
    )
}

export default Administrador;