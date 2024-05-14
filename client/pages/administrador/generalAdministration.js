import React, { useState, useEffect } from 'react';
import UserService from '@services/userService';

const GeneralAdministration = () => {
    const [numUsersRegisterWeek, setNumUsersRegisterWeek] = useState(0);

    function formatDate(date) {
        const t = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return t;
    }

    useEffect(() => {
        getNumUsersWeek();
    }, [])

    async function getNumUsersWeek(){
        const dateStart = new Date();
        const dateEnd = new Date();
        dateEnd.setDate(dateStart.getDate() - 7)
        console.log("Fecha Inicio: ", formatDate(dateStart));
        console.log("Fecha Fin: ", formatDate(dateEnd));
    }

    return (
        <section>
            <section>
                <h1>Bienvenido a la página de Administración</h1>
            </section>
            <section>
                <section>
                    <section>
                        <h2>Usuarios</h2>
                    </section>
                    <section>
                        <section>
                            <section>
                                <h3>Registrados esta Semana</h3>
                            </section>
                            <section>

                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    )
}

export default GeneralAdministration;