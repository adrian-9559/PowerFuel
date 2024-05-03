import api from './axios';

import { useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


class PaymentService {
    async confirmPayment(elements, amount) {
        const stripe = useStripe();
      
        if (!stripe || !elements) {
          throw new Error("Stripe has not been properly initialized");
        }
      
        const clientSecret = await this.createPaymentIntent(amount);
      
        const { error } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });
      
        if (error) {
          console.log("Error", error);
          if (error.type === "card_error" || error.type === "validation_error") {
            throw new Error("HA OCURRIDO UN ERROR", error.message);
          } else {
            throw new Error("An unexpected error occured.");
          }
        }
      
        return true;
      }

       loadStripePromise() {
        return loadStripe("pk_test_51P5QR3Iqj90TtX55bRu7F6whFW26fRauivAnkLbY1T2DznQWrJIsETlHhYwtKOwj4kIhCZ4joaJQ5DicdSDV1RkS00YqYPtqr4");
      };
      
      async createPaymentIntent(amount) {
        const response = await api.post(`/payments/create-payment-intent`, { amount });
        const { clientSecret } = response.data;
        return clientSecret;
      }
}

export default new PaymentService();