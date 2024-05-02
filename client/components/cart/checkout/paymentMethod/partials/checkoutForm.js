import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import Completion from "./completion";


const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({elements});

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
    setIsCompleted(true);
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  return (
    <>
    {isCompleted ? (  
      <Completion />
      ) : (
        <form onSubmit={handleSubmit}>
          <PaymentElement />
          <button type="submit" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay"}
          </button>
          {message && <div>{message}</div>}
        </form>
      )  
    }
    </>
  );
}

export default CheckoutForm;