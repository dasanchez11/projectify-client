import { getMonthDayNumbersForWeek } from './date.utils';

export const getWeek = (weekNum: number, year: number) => {
  const weekDays = getMonthDayNumbersForWeek(weekNum, year);
  const daysName = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  return weekDays.map((day, idx) => {
    const dayname = daysName[idx];
    return { dayname, day };
  });
};

const getSundayFromWeekNum = (weekNum: number, year: number) => {
  var sunday = new Date(year, 0, 1 + (weekNum - 1) * 7);
  while (sunday.getDay() !== 0) {
    sunday.setDate(sunday.getDate() - 1);
  }
  return sunday;
};

function getWeekdayNumbers(weekNumber: number, year: number) {
  var weekdays = [];
  var date = new Date(year, 0, 1 + (weekNumber - 1) * 7);
  for (var i = 0; i < 7; i++) {
    weekdays.push(date.getDay());
    date.setDate(date.getDate() + 1);
  }
  return weekdays;
}

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
  if (weekNumber === 53) {
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
    prevWeek = 53;
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
