import axiosCall from './index';
import types from './action-types';
import URL from '../../config/routes';

export const login = data => {
  const path = URL.LOGIN;
  const responseType = types.LOGIN;
  return axiosCall('post', path, responseType, data);
};

export const forgotPassword = data => {
  const path = URL.FORGOT_PASSWORD;
  const responseType = types.FORGOT_PASSWORD;
  return axiosCall('post', path, responseType, data);
};
