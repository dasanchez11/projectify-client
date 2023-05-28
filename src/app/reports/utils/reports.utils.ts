import { getMonthDaysOfWeek } from './date.utils';

export const getWeek = (weekNum: number, year: number) => {
  const weekDays = getMonthDaysOfWeek(weekNum, year, 0);
  const daysName = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return weekDays.map((day, idx) => {
    const dayname = daysName[idx];
    return { dayname, day };
  });
};

export const getWeekAndYearFromIsoDate = (date: string) => {
  const splitDate = date.split('-');
  const year = splitDate[0];
  const week = splitDate[1].slice(1);
  return { currentYear: +year, currentWeek: +week };
};

export const getIsoDateFromCurrentDate = () => {
  const currentDate = new Date() as any;
  const startDate = new Date(currentDate.getFullYear(), 0, 1) as any;
  const days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil(days / 7);
  const year = currentDate.getFullYear();
  return { weekNumber, year };
};

export const getNextWeek = (weekNumber: number, yearNumber: number) => {
  let nextWeek = weekNumber + 1;
  let nexYear = yearNumber;
  if (weekNumber === getISOWeeks(yearNumber)) {
    nextWeek = 1;
    nexYear += 1;
  }
  const returnWeek = nextWeek < 10 ? '0' + nextWeek : nextWeek.toString();
  return { nextWeek: returnWeek, nexYear };
};

export const getPrevWeek = (weekNumber: number, yearNumber: number) => {
  let prevWeek = weekNumber - 1;
  let prevYear = yearNumber;
  if (weekNumber === 1) {
    prevWeek = getISOWeeks(yearNumber - 1);
    prevYear -= 1;
  }
  const returnWeek = prevWeek < 10 ? '0' + prevWeek : prevWeek.toString();
  return { prevWeek: returnWeek, prevYear };
};

export const getMontName = (week: number, year: number) => {
  const date = new Date(year, 0);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return monthNames[new Date(date.setDate(week * 7)).getMonth()];
};

const getISOWeeks = (y: number) => {
  var d, isLeap;

  d = new Date(y, 0, 1);
  isLeap = new Date(y, 1, 29).getMonth() === 1;
  return d.getDay() === 4 || (isLeap && d.getDay() === 3) ? 53 : 52;
};
