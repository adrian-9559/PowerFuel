import React, { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import PaymentService from './PaymentService';

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      console.log("id", userId)
      const customer = await PaymentService.getCustomerPaymentMethods();
      // Asumiendo que los métodos de pago están en customer.paymentMethods
      setPaymentMethods(customer.paymentMethods);
    };

    fetchPaymentMethods();
  }, [userId]);

  return (
    <div>
      {
        paymentMethods.map((paymentMethod, i) => (
          <Card key={i} hoverable>
            <p>{paymentMethod.brand}</p>
            <p>{paymentMethod.last4}</p>
          </Card>
        ))
      }
    </div>
  );
};

export default PaymentMethodsList;