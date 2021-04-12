import moment from 'moment';
import axiosCall from './index';
import types from './action-types';
import URL from '../../config/routes';

export const getAllUsers = () => {
  const path = `${URL.GET_ALL_USERS}`;
  const responseType = types.GET_ALL_USERS;
  return axiosCall('get', path, responseType);
};

export const createUser = data => {
  data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
  data.dateOfJoining = moment(data.dateOfJoining).format('YYYY-MM-DD');
  const path = `${URL.GET_ALL_USERS}`;
  const responseType = types.CREATE_USER;
  return axiosCall('post', path, responseType, data);
};

export const updateUser = data => {
  data.dateOfBirth = moment(data.dateOfBirth).format('YYYY-MM-DD');
  data.dateOfJoining = moment(data.dateOfJoining).format('YYYY-MM-DD');
  const path = `${URL.GET_ALL_USERS}/${data.id}`;
  const responseType = types.UPDATE_USER;
  return axiosCall('put', path, responseType, data);
};

export const deleteUser = id => {
  const path = `${URL.GET_ALL_USERS}/${id}`;
  const responseType = types.DELETE_USER_BY_ID;
  return axiosCall('delete', path, responseType);
};

