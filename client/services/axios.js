import axios from 'axios';
import toastr from 'toastr';

const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
    timeout: 30000,
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
    return response;
}, async error => {
    const originalRequest = error.config;
    localStorage.removeItem('auth_token');
    // originalRequest._retry = false;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
        localStorage.removeItem('auth_token');
        // originalRequest._retry = false;
        // const refreshToken = localStorage.getItem('refresh_token');
        // try {
        //     const res = await api.post('/token/refresh', { refreshToken });
        //     localStorage.setItem('auth_token', res.data.accessToken);
        //     axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
        //     return axios(originalRequest);
        // } catch (err) {
        //     console.error(err);
        // }
    }
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    if (response && response.data && response.data.message)
        toastr.success(response.data.message);
    
    return response;

}, (error) => {
    if(error && error.response && error.response.data && error.response.data.message)
        toastr.error(error.response.data.message);
    return Promise.reject(error);
});

function addToken(req, token) {
    return { ...req, headers: { ...req.headers, Authorization: `Bearer ${token}` } };
  }

export default api;
