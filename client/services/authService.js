const axios = require('axios');

function refreshToken() {
  const refreshToken = localStorage.getItem('refresh_token');

  if (refreshToken) {
    return axios.post(`${process.env.NEXT_PUBLIC_BASE_BACKEND_URL}/api/token/refresh`, { refresh_token: refreshToken })
      .then((response) => {
        console.log('Token refreshed');
        const { access_token, refresh_token } = response.data;
        localStorage.setItem('jwtAuthToken', access_token);
        localStorage.setItem('jwtRefreshToken', refresh_token);
        return response.data;
      })
      .catch((error) => {
        console.error(error);
        throw new Error('Error refreshing token');
      });
  }

  throw new Error('No refresh token stored');
}