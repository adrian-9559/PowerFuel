// export const authTokenInterceptor = (api) => (config) => {
//   const token = sessionStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }