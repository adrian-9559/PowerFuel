import api from './axios';

class PaymentService {

  async getCustomerPaymentMethods(userId=null) {
    const response = await api.get('/payment/get-customer-payment-methods', { userId });
    console.log(response);
    return response.data.paymentMethods;
  }

  async createCheckoutSession(cart) {
    try {
      const response = await api.post('/payment/create-checkout-session', {cart}, {
        headers: {
          "Content-Type": 'application/json'
        }
      });
      return response.data.clientSecret;
    } catch(error) {
      console.log(error);
    }
  }
}

export default new PaymentService();