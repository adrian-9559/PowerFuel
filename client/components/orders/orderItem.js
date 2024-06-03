import React, { useEffect, useState } from 'react';
import { Card, Chip, Image } from '@nextui-org/react';
import ProductService from '@services/productService';
import { format } from 'date-fns';

const OrderItem = ({ order }) => {
  const [details, setDetails] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'succeeded':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  useEffect(() => {
    console.log('order', order);
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
    };
    
    fetchProduct();
  }, [order]);

  return (
    <Card shadow className="p-6 shadow-lg flex flex-col gap-2">
      <p className="font-bold text-lg">Order ID: {order.order_id}</p>
      <p>Fecha del pedido: {format(new Date(order.order_date), 'dd-MM-yyyy HH:mm')}</p>
      <p>Detalles del pedido:</p>
      <ul>
        {details.map((product, index) => (
          <li key={index} className='flex flex-row gap-2 items-center'>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
            <p>{product.product_name} x {product.quantity} {product.quantity>1?'unidades':'unidad'}  Precio: {product.price} €</p>
          </li>
        ))}
      </ul>
      <section className='flex flex-row justify-between'>
        <Chip color={getStatusColor(order.order_status)} variant='flat'>{order.order_status}</Chip>
        <p>Total: {order.total} €</p>
      </section>
    </Card>
  )
}

export default OrderItem;