import moment from 'moment';

export const disablePastDates = (date1, date2) => {
  if (date1) {
    const result = moment(date1).diff(moment(date2), 'days');
    return result < 0;
  }
  return false;
};

// return false for future dates
export const disableFutureDate = (date1, date2) => {
  if (date1) {
    const result = moment(date1).diff(moment(date2), 'day' - 1);
    return !(result > 0);
  }
  return false;
};

// return false for past dates
export const disablePastDate = date1 => {
  if (date1) {
    const result = moment(date1);
    return result < 0;
  }
  return false;
};

export const disabledateOfJoining = (date1, date2) => {
  if (date1) {
    const result = moment(date2).diff(moment(date1), 'day' - 1);
    return result < 0;
  }
  return false;
};

// return true if the given date is at lease minimum 18 years
export const getAdultAge = (date) => {
  const eighteenYears = moment().subtract(18, 'years').calendar();
  const result = moment(eighteenYears).isSameOrBefore(moment(date).format('MM/DD/YYYY'));
  return result;
};

// get start and end time of current day
export const getToday = () => {
  const start = `${moment().format('YYYY-MM-DDT00:00:00.000')}Z`;
  const end = `${moment().format('YYYY-MM-DDT23:59:59.000')}Z`;
  return { start, end };
};

// get start and end time of yesterday
export const getYesterday = () => {
  const start = `${moment().subtract(1, 'd').format('YYYY-MM-DDT00:00:00.000')}Z`;
  const end = `${moment().subtract(1, 'd').format('YYYY-MM-DDT23:59:59.000')}Z`;
  return { start, end };
};

// get start and end time of the week
export const getWeek = () => {
  const start = `${moment().subtract(6, 'd').format('YYYY-MM-DDT00:00:00.000')}Z`;
  const end = `${moment().format('YYYY-MM-DDT23:59:59.000')}Z`;
  return { start, end };
};

// get start and end time of a month
export const getMonth = () => {
  const start = `${moment().subtract(29, 'd').format('YYYY-MM-DDT00:00:00.000')}Z`;
  const end = `${moment().format('YYYY-MM-DDT23:59:59.000')}Z`;
  return { start, end };
};

// get the start and end time of the given date
export const getStartAndEndTime = (date) => {
  const start = `${moment(date).format('YYYY-MM-DDT00:00:00.000')}Z`;
  const end = `${moment(date).format('YYYY-MM-DDT23:59:59.000')}Z`;
  return { start, end };
};

// Returns the time in hh:mm:ss a format
export const getTime = (date) => {
  return `${moment(date).format('LTS')}`;
};

// Returns the time duration like 2:54:23
export const toHHMMSS = secs => {
  const sec_num = parseInt(secs, 10);
  const hours = Math.floor(sec_num / 3600);
  const minutes = Math.floor(sec_num / 60) % 60;
  const seconds = sec_num % 60;

  return [hours, minutes, seconds]
    .map(v => (v < 10 ? `0${v}` : v))
    .filter((v, i) => v !== '00' || i > 0)
    .join(':');
};

// Returns the given date in YYYY-MM-DD format
export const generalDate = (date) => {
  return date ? moment(date).format('YYYY-MM-DD') : undefined;
};
