import api from './axios';
import { loadStripe } from "@stripe/stripe-js";

class PaymentService {
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