import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
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

api.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));

api.interceptors.response.use(response => response, error => {
  // Mostrar un mensaje de error
  alert('An error occurred: ' + error.message);
  return Promise.reject(error);
});

export default api;