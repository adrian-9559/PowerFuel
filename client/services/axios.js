import axios from 'axios';
import {responseMessageInterceptor} from '../middlewares/responseMessageInterceptor';
import {authTokenInterceptor} from '../middlewares/authTokenInterceptor';
import toastr from 'toastr'; // Add the import statement for toastr

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
  timeout: 30000,
  headers: {'X-Custom-Header': 'foobar'}
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
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

  return response;
}, error => {
  if (error.response && error.response.data.message) {
    toastr.error(error.response.data.message);
  }
});

// api.interceptors.response.use(responseMessageInterceptor, error => {
//   return Promise.reject(error);
// } );

// api.interceptors.request.use(authTokenInterceptor, error => {
//   return Promise.reject(error);
// } );





export default api;