import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@components/cart/checkout/paymentMethod/partials/checkOutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    setStripePromise(loadStripe("pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4"));
  }, []);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/payments/create-payment-intent`, {
      method: "POST",
      body: JSON.stringify({}),
    }).then(async (result) => {
      var { clientSecret } = await result.json();
      setClientSecret(clientSecret);
    });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;