import React from 'react';
import axios from 'axios';
import { Alert } from 'antd';

export const redirectToLogin = () => {
  // clear the local storage
  localStorage.clear();
  // clear the local cookies
  document.cookie.split(';').forEach(c => {
    document.cookie = c
      .replace(/^ +/, '')
      .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
  });
  // redirect to the login screen
  window.location.href = '/';
};

export default {
  setupInterceptors: () => {
    // Add a response interceptor
    axios.interceptors.response.use(
      response => {
        if (response.data.error === 'Unauthorized' || response.status === 401) redirectToLogin();
        return response;
      },
      error => {
        let err = JSON.parse(JSON.stringify(error));
        if (err.message === 'Network Error') {
          return (
            <>
              <Alert message="Network Error" type="error" showIcon />
            </>
          );
        }
        err = JSON.parse(JSON.stringify(error.response));
        if (err.data.error === 'Unauthorized' || err.status === 401) redirectToLogin();
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('error');
      }
    );
  }
};
