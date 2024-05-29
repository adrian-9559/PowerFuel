import React, { useEffect, useState } from 'react';
import { Card, Chip, Image } from '@nextui-org/react';
import ProductService from '@services/productService';

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
    const fetchProduct = async () => {
      const detailsAux = JSON.parse(order.details);
      const detailsTemp = [];
      for (const item of detailsAux) {
        const productData = await ProductService.getProductById(item.product_id);
        detailsTemp.push({ ...productData, quantity: item.quantity });
      }
      setDetails(detailsTemp);
    };
    
    fetchProduct();
  }, [order]);

  return (
    <Card shadow className="p-6 rounded-md shadow-lg flex flex-col gap-2">
      <p className="font-bold text-lg">Order ID: {order.order_id}</p>
      <p>Order Date: {order.order_date}</p>
      <p>Detalles:</p>
      <ul>
        {details.map((product, index) => (
          <li key={index} className='flex flex-row gap-2 items-center'>
            <Image src={`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/public/images/product/${product.product_id}/1.png`} alt={product.product_name} width={50} height={50} />
            {product.product_name} - Cantidad: {product.quantity} - Precio: {product.price}
          </li>
        ))}
      </ul>
      <Chip color={getStatusColor(order.order_status)} variant='flat'>{order.order_status}</Chip>
    </Card>
  )
}

export default OrderItem;