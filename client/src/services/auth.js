import axios from 'axios';

export const getLocalToken = async () => {
  const data = await localStorage.getItem('token');
  return data;
};

export const isLoggedIn = async () => {
  const isLogin = await localStorage.getItem('userDetails');
  const user = JSON.parse(isLogin);
  return user;
};

export const onLogout = async () => {
  await localStorage.clear();
  window.location.href = '/login/?status=false';
};

export const setAuthToken = async () => {
  const token = await getLocalToken();

  if (token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete axios.defaults.headers.common.Authorization;
};
