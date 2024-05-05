import api from './axios';

class PaymentService {
  async getClientSecret() {
    const cart = localStorage.getItem('cart');
    const response = await api.post(`/payment/create-payment-intent`, { cart });
    return response.data;
  }
}

export default new PaymentService();