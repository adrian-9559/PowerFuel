// import toastr from 'toastr';

// export const responseMessageInterceptor = (api) => {
//     api.interceptors.response.use(response => {
//       if (response.data && response.data.message) {
//         toastr.success(response.data.message);
//       }
//       return response;
//     }, error => {
//       if (error.response && error.response.data.message) {
//         toastr.error(error.response.data.message);
//       }
//       return Promise.reject(error);
//     });
//   }