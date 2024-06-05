import React, { useEffect, useState } from 'react';
import { Card, Chip, Image, ScrollShadow } from '@nextui-org/react';
import ProductService from '@services/productService';
import { format } from 'date-fns';

const OrderItem = ({ order }) => {
  const [details, setDetails] = useState([]);
  const [shippingAddress, setShippingAddress] = useState(null);

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

  useEffect(() => {
    const fetchProduct = async () => {
      let total = 0;
      const detailsAux = JSON.parse(order.details);
      const detailsTemp = [];
      for (const item of detailsAux) {
        const productData = await ProductService.getProductById(item.product_id);
        detailsTemp.push({ ...productData, quantity: item.quantity });
        total += productData.price * item.quantity;
      }
      setDetails(detailsTemp);
      order.total = total.toFixed(2);
      setShippingAddress(JSON.parse(order.shipping_address));
    };
    
    fetchProduct();
  }, [order]);

  return (
    <Card shadow className="p-6 shadow-lg flex flex-col gap-2">
      <p className="font-bold text-lg">Order ID: {order.order_id}</p>
      <p>Fecha del pedido: {format(new Date(order.order_date), 'dd-MM-yyyy HH:mm')}</p>
      <p>Detalles del pedido:</p>
      <ScrollShadow className="mb-4 h-[13rem] bg-zinc-600 bg-opacity-10 rounded-lg p-4 grid gap-2">        
        {details.map((product, index) => (
          <section key={index} className='flex flex-row gap-2 items-center'>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
            <p>{product.product_name} x {product.quantity} {product.quantity>1?'unidades':'unidad'}  Precio: {product.price} €</p>
          </section>
        ))}
      </ScrollShadow>
      {shippingAddress && (
        <div>
          <p>Dirección de envío:</p>
          <p>{shippingAddress.street}, {shippingAddress.city}, {shippingAddress.province}, {shippingAddress.country}, {shippingAddress.zip}</p>
          <p>Teléfono: {shippingAddress.phone_number}</p>
        </div>
      )}
      <section className='flex flex-row justify-between'>
        <Chip color={getStatusColor(order.order_status)} variant='flat'>{order.order_status}</Chip>
        <p>Total: {order.total} €</p>
      </section>
    </Card>
  )
}

export default OrderItem;