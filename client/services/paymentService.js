import api from './axios';

class PaymentService {
    async createPayment(source) {
        const response = await api.post(`/api/create-payment`, {
            id: source
        });
        return response.data.status;
    }

    async createCustomer(email) {
        const response = await api.post(`/api/create-customer`, {
            email: email
        });
        return response.data.customer_id;
    }

    async addCard(customer_id, token) {
        const response = await api.post(`/api/add-card`, {
            customer_id: customer_id,
            token: token
        });
        return response.data.card;
    }
}

export default new PaymentService();