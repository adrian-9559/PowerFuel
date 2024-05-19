import React, { useEffect, useState } from 'react';
import { Card } from '@nextui-org/react';
import PaymentService from '@services/paymentService';

const PaymentMethodsList = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      const customer = await PaymentService.getCustomerPaymentMethods();
      setPaymentMethods(customer.paymentMethods);
    };

    fetchPaymentMethods();
  }, [ setPaymentMethods]);

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