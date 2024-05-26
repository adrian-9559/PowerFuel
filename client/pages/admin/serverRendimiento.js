import React, { useState, useEffect } from 'react';
import { Slider, CircularProgress } from '@nextui-org/react';

import serverService from '@services/serverService'

const ServerRendimiento = () => {
    const [usoRAMPorcentaje, setUsoRAMPorcentaje] = useState(0);
    const [usoCPUPorcentaje, setUsoCPUPorcentaje] = useState(0);
    const [usoDiskPorcentaje, setUsoDiskPorcentaje] = useState(0);
    const [colorCPU, setColorCPU] = useState("green");
    const [colorRAM, setColorRAM] = useState("green");
    const [colorDisk, setColorDisk] = useState("green");

    useEffect(() => {
        const interval = setInterval(() => {
            serverService.getServerInfo()
                .then((result) => {
                    setUsoCPUPorcentaje(result.cpu);
                    setUsoRAMPorcentaje(result.ram);
                    setUsoDiskPorcentaje(result.disk);
                })
                .then(() => {
                    setColorCPU(colores(usoCPUPorcentaje));
                    setColorRAM(colores(usoRAMPorcentaje));
                    setColorDisk(colores(usoDiskPorcentaje));
                })
                .catch((err) => {
                    console.error("Error al obtener la información del rendimiento del servidor")
                });
        }, 5000);

        return () => clearInterval(interval);
    })

    function colores(data){
        if (data > 80) {
            return "danger";
        } else if (data > 50) {
            return "warning";
        } else {
            return "success";
        }
    }

    return (
        <section>
            <section>
                <h1 className="text-center text-2xl font-bold">Rendimiento del servidor</h1>
            </section>
            <section className="mt-5">
                <section className="flex gap-6 justify-center">
                    <section className="bg-white bg-opacity-20 w-auto h-auto p-6 items-center justify-center rounded-lg flex flex-col gap-2">
                        <h2>Uso de CPU</h2>
                        <CircularProgress
                            classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                value: "text-3xl font-semibold",
                              }}
                            aria-label="Loading..."
                            value={usoCPUPorcentaje || 0}
                            color={colorCPU}
                            showValueLabel={true}
                        />
                    </section>
                    <section className="bg-white bg-opacity-20 w-auto h-auto p-6 items-center justify-center rounded-lg flex flex-col gap-2">
                        <h2>Uso de RAM</h2>
                        <CircularProgress
                            classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                value: "text-3xl font-semibold",
                              }}
                            aria-label="Loading..."
                            value={usoRAMPorcentaje || 0}
                            color={colorRAM}
                            showValueLabel={true}
                        />
                    </section>
                    <section className="bg-white bg-opacity-20 w-auto h-auto p-6 items-center justify-center rounded-lg flex flex-col gap-2">
                        <h2>Uso de Disco Duro</h2>
                        <CircularProgress
                            classNames={{
                                svg: "w-36 h-36 drop-shadow-md",
                                value: "text-3xl font-semibold",
                              }}
                            aria-label="Loading..."
                            value={usoDiskPorcentaje || 0}
                            color={colorDisk}
                            showValueLabel={true}
                        />
                    </section>
                </section>
            </section>
        </section>
    )
}

export default ServerRendimiento;