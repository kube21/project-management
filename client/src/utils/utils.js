/* eslint-disable no-unused-vars */
import moment from 'moment';

/**
 * this function is used to convert the date format
 * into YYYY-MM-DD
 * @param {*} date
 * @returns 2019-12-31
 */

export const standardDate = date => {
  if (date) {
    return moment(date).format('YYYY-MM-DD');
  }
  return null;
};

export const compareObjects = (data1, data2) => {
  const result = JSON.stringify(data1) !== JSON.stringify(data2);
  return result;
};

export const groupByDate = (data, key = 'createdAt') => {
  const group = data.reduce((r, a) => {
    r[moment(a[key]).format('YYYY-MM-DD')] = [...r[moment(a[key]).format('YYYY-MM-DD')] || [], a];
    return r;
  }, {});
  return group;
};
