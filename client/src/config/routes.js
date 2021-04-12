export const BASE_URL = "http://localhost:5000/api/v1/";

export default {
  // Auth based routes
  LOGIN: `${BASE_URL}auth/login`,
  SIGN_UP: `${BASE_URL}auth/signup`,

  // Project based routes
  GET_ALL_PROJECTS: `${BASE_URL}project`,

  // User based routes
  GET_ALL_USERS: `${BASE_URL}user`,
};
