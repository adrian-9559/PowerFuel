import React, {useEffect, useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useAppContext } from '@context/AppContext';
import PaymentService from '@services/paymentService'; // Asegúrate de usar la ruta correcta

const stripePromise = loadStripe('pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4');

const PaymentForm = () => {
  const {cart, setCart} = useAppContext();
  const fetchClientSecret = useCallback(async () => {
    return await PaymentService.createCheckoutSession(cart);
  }, []);

  const handleSuccess = () => {
    setCart([]);
  };

  const options = {fetchClientSecret};

  return (
    <div className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
      >
        <EmbeddedCheckout 
          
          onSuccess={handleSuccess}
        />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default PaymentForm;