import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useRouter } from "next/router";
import Completion from "./completion";
import PaymentService from "@services/paymentService";
import { useAppContext } from "@context/AppContext";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
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
      await PaymentService.confirmPayment(calculateTotal(cart));
      setIsCompleted(true);
    } catch (error) {
      setMessage("Ha ocurrido un error:")
      console.error(error);
    }
  
    setIsProcessing(false);
  };

  return (
    <>
      {isCompleted ? (
        <Completion />
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PaymentElement />
          <Button fullWidth type="submit" disabled={isProcessing}>
            {isProcessing ? "Procesando..." : "Pagar"}
          </Button>
          {message && <div>{message}</div>}
        </form>
      )}
    </>
  );
};

export default CheckoutForm;