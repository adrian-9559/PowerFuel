import { Button, Input, Textarea, Card, Image, ScrollShadow} from '@nextui-org/react';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import OrderService from '@services/orderService';
import ProductService from '@services/productService';
import useTitle from '@hooks/useTitle'; 

const CreateOrder = () => {
    const router = useRouter();
    const id = router.query.id;
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
    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    useTitle(id?'Editar Pedido':'Crear Pedido');
    const getStatusColor = (status) => {
        switch (status) {
          case 'entregado':
            return 'success';
          case 'enviado':
            return 'warning';
          case 'pendiente':
            return 'warning';
          case 'en_proceso':
            return 'warning';
          case 'cancelado':
            return 'danger';
          case 'devuelto':
            return 'primary';
          case 'fallido':
            return 'danger';
          default:
            return 'default';
        }
    };

    const getOrder = async () => {
        if(id) {
            const orderDetails = await OrderService.getOrderById(id);
            console.log(orderDetails);
            setOrder(orderDetails);
            formatForm(orderDetails); 
            setLoading(false);
        }
    }

    const formatForm = (order) => { 
        if(!order || !order.shipping_address) return;
        const datosDireccion = JSON.parse(order.shipping_address);   
        setFormState({
            order_id: order.order_id,
            user_id: order.user_id,
            order_date: order.order_date,
            order_status: order.order_status,
            details: order.details,
            shipping_address: {
                street: datosDireccion.street,
                city: datosDireccion.city,
                zip: datosDireccion.zip,
                province: datosDireccion.province,
                country: datosDireccion.country,
                phone_number: datosDireccion.phone_number
            }
        });
    }

    useEffect(() => {
        const fetchProduct = async () => {
            if(!order || !order.details) return;
            let total = 0;
            const detailsAux = JSON.parse(order.details);
            const detailsTemp = [];
            for (const item of detailsAux) {
                const productData = await ProductService.getProductById(item.product_id);                    
                detailsTemp.push({ ...productData, quantity: item.quantity });
                total += productData.price * item.quantity;
            }
            setProducts(detailsTemp);
        };
        
        fetchProduct();
    }, [order]);

    useEffect(() => {
        if(id) {
            setLoading(true);
            getOrder();
            formatForm();
            console.log(order);
        }
    }, [id]);

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
                <h1 className="text-2xl font-bold mb-4">{id ? 'Editar Pedido' : 'Crear Pedido'}</h1>
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
                    <ScrollShadow className="mb-4 h-[15rem] bg-zinc-600 bg-opacity-10 rounded-lg p-4 grid gap-2">
                        {products && products.map((product, index) => (
                            <section key={index} className='flex flex-row gap-2 items-center'>
                                <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
                                <section className='w-full'>
                                    <p>{product.product_name} x {product.quantity}</p>
                                    <section className='flex justify-between w-full'>
                                        <section className='flex gap-4'>
                                            <p><span className="font-bold">Precio:</span> {product.price} €</p>
                                            <p><span className="font-bold">Cantidad:</span> x{product.quantity} unidades</p>
                                        </section>
                                        <section>
                                            <p><span className="font-bold">Total:</span> {product.price * product.quantity} €</p>
                                        </section>
                                    </section>
                                </section>
                            </section>
                        ))}
                    </ScrollShadow>
                    <section className="mb-4">
                        <section className="flex flex-row justify-center gap-4 items-center w-full">
                            <section className="flex flex-col justify-center gap-4 items-center w-full">
                                <Input name="street" label="Dirección:"  value={formState.shipping_address.street}/>
                                <Input name="city" label="Ciudad:" value={formState.shipping_address.city}/>
                                <Input name="zip" label="Código Postal:" value={formState.shipping_address.zip}/>
                            </section>
                            <section className="flex flex-col justify-center gap-4 items-center w-full">
                                <Input name="province" label="Provincia/Estado:" value={formState.shipping_address.province}/>
                                <Input name="country" label="País:" value={formState.shipping_address.country}/>
                                <Input name="phone_number" label="Teléfono:" value={formState.shipping_address.phone_number}/>
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