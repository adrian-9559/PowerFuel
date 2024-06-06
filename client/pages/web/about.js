import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Divider, Image, Button } from "@nextui-org/react";
import Router, { useRouter } from 'next/router';
import BrandLogo from '@icons/BrandLogo';
import ShopIcon from '@icons/ShopIcon';

const About = () => {
    const router = useRouter();
    return (
        <main className="h-full grid gap-80 pb-20" style={{backgroundImage: "url('/images/web/home/fondo.webp')", backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
            <section className='bg-default bg-opacity-80 grid justify-center w-full py-40 mt-52 items-center gap-10'>
                <h1 className='text-6xl font-bold'>Bienvenido a PowerFuel</h1>
            </section>
            <section>
                <div className='bg-gradient-to-t from-gray-500 h-10'></div>
                <section className='bg-default flex w-full p-20 items-center justify-center gap-20'>
                    <Card className='w-1/2 p-4'>
                        <CardHeader>
                            <h2 className='text-3xl font-boldflex justify-center'>Tu Fuente de Energía y Bienestar</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody className='w-full flex justify-center '>
                            <p className='w-1/2'>En PowerFuel, nos apasiona proporcionarte los mejores alimentos y suplementos alimenticios para apoyar tu estilo de vida saludable. Ya sea que busques mejorar tu rendimiento deportivo, mantener una dieta equilibrada, o simplemente sentirte mejor en tu día a día, estamos aquí para ayudarte a alcanzar tus objetivos.</p>
                        </CardBody>
                    </Card>
                    <section>
                        <BrandLogo/>
                    </section>
                </section>
                <div className='bg-gradient-to-b from-gray-500 h-10'></div>
            </section>
            <section>
                <div className='bg-gradient-to-t from-gray-500 h-10'></div>
                <section className='bg-default flex w-full p-20 items-center justify-center gap-20'>
                    <Card className='w-1/2 p-4'>
                        <CardHeader>
                            <h2 className='text-3xl font-bold flex justify-center'>¿Quiénes Somos?</h2>
                        </CardHeader>
                        <Divider/>
                        <CardBody className=' w-full flex justify-center '>
                            <p>PowerFuel es más que una tienda; somos una comunidad comprometida con el bienestar y la salud. Nuestra misión es ofrecer productos de alta calidad, respaldados por la ciencia y cuidadosamente seleccionados para garantizar que recibas solo lo mejor. Cada artículo en nuestro catálogo ha sido probado y aprobado para cumplir con nuestros altos estándares de calidad y eficacia.</p>
                        </CardBody>
                    </Card>
                    <section>
                        <ShopIcon/>
                    </section>
                    <Card className='w-1/2 p-4'>
                        <CardHeader>
                            <h2 className='text-3xl font-bold flex justify-center'>Compromiso con la Calidad</h2>
                        </CardHeader>
                        <Divider />
                        <CardBody className='w-full flex justify-center '>
                            <p className='flex justify-center'>En PowerFuel, nos tomamos en serio tu salud. Trabajamos con los mejores proveedores y marcas del mercado para asegurarnos de que todos nuestros productos sean seguros, efectivos y de la más alta calidad. Además, estamos constantemente investigando y actualizando nuestro catálogo para incluir las últimas innovaciones en nutrición y bienestar.</p>
                        </CardBody>
                    </Card>
                </section>
                <div className='bg-gradient-to-b from-gray-500 h-10'></div>
            </section>
            <section>
                <div className='bg-gradient-to-t from-gray-500 h-10'></div>
                <section className='bg-default grid w-full p-20 gap-20'>
                    <section className='w-full flex justify-center items-center gap-10'>
                        <Card className='w-full p-4'>
                            <CardHeader>
                                <h2 className='text-3xl font-bold flex justify-center'>Experiencia de Compra</h2>
                            </CardHeader>
                            <Divider/>
                            <CardBody className=' w-full flex justify-center '>
                                <p className=' flex justify-center'>Nuestra tienda en línea está diseñada para ofrecerte una experiencia de compra rápida, segura y sin complicaciones. Disfruta de una navegación intuitiva, descripciones detalladas de productos y un proceso de pago sencillo. Además, contamos con un servicio de atención al cliente dedicado para asistirte en cualquier momento.</p>
                            </CardBody>
                        </Card>
                        <section className='flex justify-center'>
                            <Image alt='package' src='/images/web/home/package.jpg' className='w-7/12'/>
                        </section>
                    </section>
                    <section className='w-full flex '>
                        <section>
                            <Image alt='community' src='/images/web/home/community.jpg' className='w-7/12'/>
                        </section>
                        <Card className='w-1/2 p-4'>
                            <CardHeader>
                                <h2 className='text-3xl font-bold flex justify-center'>Únete a Nuestra Comunidad</h2>
                            </CardHeader>
                            <Divider/>
                            <CardBody className='w-full flex justify-center '>
                                <p className=' flex justify-center'>Síguenos en nuestras redes sociales y suscríbete a nuestro boletín para recibir las últimas noticias, promociones exclusivas y consejos de expertos en salud y bienestar. En PowerFuel, estamos aquí para apoyarte en cada paso de tu camino hacia una vida más saludable y activa.</p>
                            </CardBody>
                        </Card>
                    </section>
                </section>
                <div className='bg-gradient-to-b from-gray-500 h-10'></div>
            </section>
            <section className='bg-gray-100 bg-opacity-70 grid justify-center w-full p-7 items-center'>
                <section className='w-full flex justify-center'>
                    <p className='text-black flex justify-center font-bold text-3xl'>Gracias por elegir PowerFuel. Juntos, alimentaremos tu energía y potenciaremos tu vida.</p>
                </section>
            </section>
        </main>
    )
}

export default About;