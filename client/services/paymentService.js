import api from './axios';

class PaymentService {

  async getCustomerOrders(userId=null) {
    const response = await api.get('/stripe/get-customer-orders', { userId });
    return response.data;
  }

  async createCheckoutSession(cart) {
    const response = await api.post('/payment/create-checkout-session', { cart });
    const session = response.data;
    return session.clientSecret;
  }

}

const paymentService = new PaymentService();

export default paymentService;