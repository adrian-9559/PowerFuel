import React, { useState, useEffect } from 'react';
import {Card, CardHeader, CardBody, CardFooter, Image, Button, Calendar} from "@nextui-org/react";
import {today, getLocalTimeZone} from "@internationalized/date";
import UserService from '@services/userService';

const GeneralAdministration = () => {
    const [numUsersRegisterWeek, setNumUsersRegisterWeek] = useState(0);
    const [numTotalProducts, setNumTotalProducts] = useState(0);
    const [numTotalUsers, setNumTotalUsers] = useState(0);
    const [numTotalOrders, setNumTotalOrders] = useState(0);

    function formatDate(date) {
        const t = date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        return t;
    }


    useEffect(() => {
        async function getNumUsersWeek(){
            const dateStart = new Date();
            const dateEnd = new Date();
            dateEnd.setDate(dateStart.getDate() - 7);
        }
    
        getNumUsersWeek();
    }, [])

    return (
        <section className="w-full p-6 flex flex-col gap-3">
            <section className='w-full flex gap-3'>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Usuarios</p>
                        <h4 className="font-medium text-large">Estadísticas</h4>
                    </CardHeader>
                    <CardBody className="justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                        <Card className='bg-blue-500 bg-opacity-50 rounded-[0.375rem] '>
                            <CardHeader >
                                <h4 className="font-medium text-2xs text-large text-tiny">Número total de usuarios</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-blue-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Usuarios registrados esta semana</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-blue-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Usuarios en la página</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-blue-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Usuarios que han comprado</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                    <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Pedidos</p>
                        <h4 className="font-medium text-large">Estadísticas</h4>
                    </CardHeader>
                    <CardBody className=" justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem] '>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Número total de pedidos</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl ">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Pedidos semanales</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Pedidos en reparto</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-purple-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Pedidos entregados</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                    </CardBody>
                </Card>
                <Card className="col-span-12 sm:col-span-4 h-auto w-full">
                <CardHeader className="flex-col !items-start pb-0">
                        <p className="text-tiny uppercase font-bold">Productos</p>
                        <h4 className="font-medium text-large">Estadísticas</h4>
                    </CardHeader>
                    <CardBody className=" justify-center h-auto w-full grid grid-cols-2 grid-row-2 gap-2">
                        <Card className='bg-green-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem] '>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Número total de productos</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl ">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-green-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Productos en oferta</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-green-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Productos sin stock</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                        <Card className='bg-green-500 w-auto h-auto bg-opacity-50 h-auto flex flex-col rounded-[0.375rem]'>
                            <CardHeader className="z-10 flex-col !items-start pb-0">
                                <h4 className="font-medium text-2xs text-large text-tiny">Productos</h4>
                            </CardHeader>
                            <CardBody>
                                <p className="uppercase text-6xl">{numTotalUsers}</p>
                            </CardBody>
                        </Card>
                    </CardBody>    
                </Card>
                <Card className=" h-auto w-full">
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <p className="text-tiny uppercase font-bold">Calendario</p>
                    </CardHeader>
                    <CardBody className="flex justify-center items-center mt-6">
                        <Calendar 
                            aria-label="Date (Read Only)" 
                            value={today(getLocalTimeZone())}
                            color="primary"
                            pageBehavior="single"
                            showMonthAndYearPickers 
                            isReadOnly 
                        />
                    </CardBody>
                </Card>
            </section>
            <Card isFooterBlurred className="w-full h-auto col-span-12 sm:col-span-5">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">New</p>
                    <h4 className="text-black font-medium text-2xl">Acme camera</h4>
                </CardHeader>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                    <p className="text-black text-tiny">Available soon.</p>
                    <p className="text-black text-tiny">Get notified.</p>
                    </div>
                    <Button className="text-tiny" color="primary" radius="full" size="sm">
                    Notify Me
                    </Button>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="w-full h-auto col-span-12 sm:col-span-7">
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">Your day your way</p>
                    <h4 className="90 font-medium text-xl">Your checklist for better sleep</h4>
                </CardHeader>
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny">Breathing App</p>
                            <p className="text-tiny">Get a good nights sleep.</p>
                        </div>
                    </div>
                    <Button radius="full" size="sm">Get App</Button>
                </CardFooter>
            </Card>
        </section>
    )
}

export default GeneralAdministration;