import React, {useCallback} from 'react';
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { useAppContext } from '@context/AppContext';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4');

const PaymentForm = () => {
    const {cart} = useAppContext();
  const fetchClientSecret = useCallback(() => {
    // Create a Checkout Session
    return fetch("http://25.65.210.24:4001/api/payment/create-checkout-session",{
      method: "POST",
      headers: {
      "Content-Type": "application/json"
      },
      body: JSON.stringify({ cart })
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, []);

  const options = {fetchClientSecret};

  return (
    <div className="w-full">
      <EmbeddedCheckoutProvider
        stripe={stripePromise}
        options={options}
        style={{height: '100%', width: '100%'}}
      >
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}

export default PaymentForm;