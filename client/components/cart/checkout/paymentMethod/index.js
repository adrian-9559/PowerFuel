import { use, useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "@components/cart/checkout/paymentMethod/partials/checkOutForm";
import PaymentService from "@services/paymentService";
import { useAppContext } from "@context/AppContext";


function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const { cart } = useAppContext();

  const calculateTotal = (cart) => {
    let total = 0;
    cart?.forEach(item => {
        total += item.price * item.quantity;
    });
    return total * 100;
  }

  useEffect(() => {
    setStripePromise(PaymentService.loadStripePromise());
  }, []);

  useEffect(() => {
    PaymentService.createPaymentIntent(calculateTotal(cart)).then(setClientSecret);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold">Método de pago</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;