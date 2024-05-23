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
  console.log('token', token);
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

api.interceptors.response.use((response) => {
  return response;
}, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    const refreshToken = localStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        const res = await api.post('/refresh', { token: refreshToken });
        if (res.status === 200) {
          localStorage.setItem('auth_token', res.data.auth_token);
          api.defaults.headers.common['Authorization'] = `Bearer ${res.data.auth_token}`;
          return api(originalRequest);
        }
      } catch (err) {
        console.log(err);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
      }
    } else {
      localStorage.removeItem('auth_token');
    }
  }
  return Promise.reject(error);
});

// api.interceptors.response.use(responseMessageInterceptor, error => {
//   return Promise.reject(error);
// } );

// api.interceptors.request.use(authTokenInterceptor, error => {
//   return Promise.reject(error);
// } );





export default api;