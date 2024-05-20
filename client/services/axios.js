import axios from 'axios';
import responseInterceptor from '../middlewares/responseInterceptor';
import requestInterceptor from '../middlewares/requestInterceptor';

const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api`,
  timeout: 30000,
  headers: {'X-Custom-Header': 'foobar'}
});

api.interceptors.response.use(responseInterceptor);
api.interceptors.request.use(requestInterceptor);

export default api;