import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Completion from "./completion";
import PaymentService from "@services/paymentService";
import { useAppContext } from "@context/AppContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cart } = useAppContext();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setIsProcessing(true);

    const calculateTotal = (cart) => {
      let total = 0;
      cart?.forEach(item => {
          total += item.price * item.quantity;
      });
      return total * 100;
    }

    try {
      const clientSecret = await PaymentService.createPaymentIntent(calculateTotal(cart));

      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (error) {
        setMessage("Ha ocurrido un error:")
        console.error(error);
      } else {
        setIsCompleted(true);
      }
    } catch (error) {
      setMessage("Ha ocurrido un error:")
      console.error(error);
    }
  
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <CardElement />
      <Button fullWidth type="submit" disabled={isProcessing}>
        {isProcessing ? "Procesando..." : "Pagar"}
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default CheckoutForm;