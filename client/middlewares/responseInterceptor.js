import toastr from 'toastr';
import Router from 'next/router';
import api from '@services/axios'; 

// const responseInterceptor = api.interceptors.response.use((response) => {
//   if (response.data && response.data.message) {
//     toastr.success(response.data.message);
//   }

//   return response;
//   }, (error) => {
//     if (error.response) {
//       if (error.response.status === 401) {
//         sessionStorage.removeItem('token');
//       } else if (error.response.status === 403) {
//         Router.push('/');
//         toastr.error('Es necesario ser administrador para acceder a esta página.');
//       } else if (error.response.data.message) {
//         toastr.error(error.response.data.message);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// export default responseInterceptor;