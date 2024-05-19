import axios from 'axios';
import toastr from 'toastr';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
  timeout: 30000,
  headers: {'X-Custom-Header': 'foobar'}
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

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  if (response.data && response.data.message) {
    toastr.success(response.data.message);
  }

  // Devuelve la respuesta sin modificar
  return response;
}, error => {
  if (error.response && error.response.data.message) {
    toastr.error(error.response.data.message);
  }

  // Rechaza la promesa con el error
  return Promise.reject(error);
});

export default api;