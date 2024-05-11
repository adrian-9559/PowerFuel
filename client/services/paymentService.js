import api from './axios';

class PaymentService {
  async getCustomer(userId) {
    const response = await api.get('/payment/get-customer', { userId });
    return response.data;
  }

  async getCustomerCharges(userId) {
    const response = await api.get('/payment/get-customer-charges', { userId });
    return response.data;
  }

  async createCheckoutSession(cart) {
    const response = await api.post('/payment/create-checkout-session', { cart });
    console.log(response.data);
    return response.data.clientSecret;
  }
}

export default new PaymentService();