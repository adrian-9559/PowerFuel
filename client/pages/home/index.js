import React from 'react';
import { useRouter } from 'next/router';
import {Card, CardHeader, Image} from '@nextui-org/react';

const HomeComponent = () => {
    const router = useRouter();
    return (
        <main>
            <section>
                <h1 className="font-bold text-2xl">Bienvenido a PowerFuel!</h1>
            </section>
            <section>
                <section className="flex grid-cols-2 gap-32 mx-16 my-4 h-32">
                    <Card className='w-full h-40 shadow-lg' isPressable onPress={() => router.push(`/category/novedades`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <h1 className="font-bold text-2xl text-white">
                                Novedades
                            </h1>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card backgroun Novedades"
                            className="z-0 w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/novedades.webp`}
                        />
                    </Card>
                    <Card className='w-full h-40 shadow-lg' isPressable onPress={() => router.push(`/category/ofertas`)}>
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <h1 className="font-bold text-2xl text-white">
                                Ofertas del día
                            </h1>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card background Ofertas"
                            className="z-0 w-full h-full object-cover"
                            src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/web/home/ofertas.webp`}
                        />
                    </Card>
                </section>
            </section>
            <section>
                <Card>
                    <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                        <h1 className="font-bold text-2xl text-white">
                            Destacados
                        </h1>
                    </CardHeader>
                    
                </Card>
            </section>
        </main>
    );
}

export default HomeComponent;