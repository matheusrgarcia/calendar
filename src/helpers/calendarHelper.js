export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export const WEEK = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const formatDate = (date) => {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
};

export const getFirstDayOfTheMonth = () => {
  const currentDate = new Date();

  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  return firstDay;
};

export const getCurrentMonth = () => {
  const currentDate = new Date();

  return currentDate.getMonth();
};

export const getCurrentDay = () => {
  return new Date();
};

export const getCurrentMonthName = () => {
  return MONTHS[getCurrentMonth()];
};
