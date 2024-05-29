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
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = localStorage.getItem('refresh_token');
        try {
            const res = await axios.post('/api/token/refresh', { refreshToken });
            localStorage.setItem('auth_token', res.data.accessToken);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.accessToken;
            return axios(originalRequest);
        } catch (err) {
            console.log(err);
        }
    }
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    console.log(error);
    toastr.error(error.response.data.message);
    return Promise.reject(error);
});

function addToken(req, token) {
    return { ...req, headers: { ...req.headers, Authorization: `Bearer ${token}` } };
  }

export default api;
