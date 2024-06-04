import { Button, Input, Textarea, Card } from '@nextui-org/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderService from '@services/orderService';

const CreateOrder = () => {
    const [formState, setFormState] = useState({
        order_id: '',
        user_id: '',
        order_date: '',
        order_status: '',
        details: '',
        shipping_address: {
            street: '',
            city: '',
            zip: '',
            province: '',
            country: '',
            phone_number: ''
        }
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const router = useRouter();

    const handleChange = (name) => (value) => {
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await OrderService.addOrder(formState);
            router.push('/admin/Pedidos');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="max-w-4xl mx-auto mt-10 p-6 ">
            <Card shadow className="p-5">
                <h1 className="text-2xl font-bold mb-4">Crear Pedido</h1>
                {error && <p className="mb-4 text-red-500">{error}</p>}
                <form onSubmit={handleRegister}>
                    <section className="mb-4">
                        <Input 
                            type='text' 
                            label='Estado del Pedido' 
                            name="order_status" 
                            value={formState.order_status} 
                            onValueChange={handleChange('order_status')}
                        />
                    </section>
                    <section className="mb-4">
                        <Textarea 
                            label='Detalles del Pedido' 
                            value={formState.details} 
                            onValueChange={handleChange('details')}
                        />
                    </section>
                    <section className="mb-4">
                        <section className="flex flex-row justify-center gap-4 items-center w-full">
                            <section className="flex flex-col justify-center gap-4 items-center w-full">
                                <Input name="street" label="Dirección:"  />
                                <Input name="city" label="Ciudad:" />
                                <Input name="zip" label="Código Postal:" />
                            </section>
                            <section className="flex flex-col justify-center gap-4 items-center w-full">
                                <Input name="province" label="Provincia/Estado:" />
                                <Input name="country" label="País:" />
                                <Input name="phone_number" label="Teléfono:" />
                            </section>
                        </section>
                    </section>
                    <section>
                        <Button type='submit' disabled={loading} className="w-full">
                            {loading ? 'Cargando...' : 'Crear Pedido'}
                        </Button>
                        <Button type='button' color="danger" onClick={() => router.push('/admin/Pedidos')} className="w-full mt-4">Cancelar</Button>
                    </section>
                </form>
            </Card>
        </main>
    );
}

export default CreateOrder;