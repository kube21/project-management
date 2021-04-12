/* eslint-disable consistent-return */
import axios from 'axios';
import { setAuthToken } from '../../services/auth';

// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
export default function axiosCall(method, url, responseType, data) {
  return async dispatch => {
    await setAuthToken();
    const apiData = data ? { method, url, data } : { method, url };
    axios(apiData)
      .then(response => {
        if (response.data) {
          dispatch({ type: responseType, updatePayload: response.data });
          return response.data;
        }
      })
      .catch(err => {
        dispatch({
          type: `${responseType}_REJECTED`,
          updatePayload: err.response
        });
        return err.response;
      });
  };
}
