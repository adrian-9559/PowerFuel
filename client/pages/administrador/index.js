import React, { useState, useEffect } from 'react';
import WelcomeAdministration from './welcomeAdministration';
import SideMenuAdministrador from "./SideMenuAdministrador";
import UserAdministration from "./userAdministration";

const Administrador = () => {
    const [ComponentUse, setComponentUse] = useState('WelcomeAdministration');

    return (
        <section className="h-full flex">
            <section className="h-full">
                <SideMenuAdministrador setComponentUse={setComponentUse}/>
            </section>
            <section>
                {ComponentUse === 'WelcomeAdministration' && <WelcomeAdministration/>}
                {ComponentUse === 'usuarios' && <UserAdministration/>}
            </section>
        </section>
    )
}

export default Administrador;