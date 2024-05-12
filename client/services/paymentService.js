import api from './axios';

class PaymentService {
  async getCustomer(userId=null) {
    const response = await api.get('/payment/get-customer', { userId });
    return response.data;
  }

  async getCustomerCharges(userId=null) {
    const response = await api.get('/payment/get-customer-charges', { userId });
    return response.data;
  }

  async getCustomerPaymentMethods(userId=null) {
    const response = await api.get('/payment/get-customer-payment-methods', { userId });
    console.log(response.data);
    return response.data.paymentMethods;
  }

  async createCheckoutSession(cart) {
    const response = await api.post('/payment/create-checkout-session', { cart });
    return response.data.clientSecret;
  }
}

export default new PaymentService();