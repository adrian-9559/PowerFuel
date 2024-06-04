import React from 'react';
import { Card, CardBody, Textarea, Button, Input } from '@nextui-org/react';

const Help = () => {
    return (
        <section className='w-full grid gap-8 p-8'>
            <section className='w-full flex justify-center text-5xl'>
                <h1>Ayuda</h1>
            </section>
            <section className='w-full flex justify-center'>
                <Card className='w-2/3'>
                    <CardBody className='w-full px-16 py-8'>
                        <form method="post" className='grid gap-8'>
                            <section className='grid'>
                                <label htmlFor="name">Nombre</label>
                                <Input type="text" id="name" name="name" label='Nombre'/>
                            </section>
                            <section  className='grid'>
                                <label htmlFor="email">Correo</label>
                                <Input type="email" id="email" name="email" label='Correo electrónico'/>
                            </section>
                            <section  className='grid'>
                                <label htmlFor="message">Mensaje</label>
                                <Textarea id="message" name="message" label='Descripción del problema'></Textarea>
                            </section>
                            <section className='w-full flex justify-center'>
                                <Button type="submit">Enviar</Button>
                            </section>
                        </form>
                    </CardBody>
                </Card>
            </section>
        </section>
    )
}


export default Help;