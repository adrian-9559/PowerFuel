import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4001/api',
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      sessionStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;