import React, { useState, useEffect } from 'react';
import serverService from 'services/serverService';

const ServerRendimiento = () => {
    const [usoCPUPorcentaje, setUsoCPUPorcentaje] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            serverService.getServerInfoCPU()
               .then(res => {
                    console.log(res)
                })
        }, 1000);
    })

    return (
        <section>
            <section>
                <h1>ServerRendimiento</h1>
            </section>
            <section>
                <p>Uso de CPU: {usoCPUPorcentaje}%</p>
            </section>
        </section>
    )
}

export default ServerRendimiento;