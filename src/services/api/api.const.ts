const API_URL = process.env.API_URL;
const API_ROUTES = {
  AUTH: {
    PING: API_URL + '/auth/ping',
    WEBAPP: API_URL + '/auth/webapp',
  },
  USERS: {
    PROFILE: {
      ME: API_URL + '/users/profile/me',
    },
  },
};

export { API_ROUTES };
