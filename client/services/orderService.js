import api from './axios';

class OrderService {

  async getUserOrders(userId=null) {
    const response = await api.get('/orders/user');
    return response.data;
  }

}

const orderService = new OrderService();

export default orderService;