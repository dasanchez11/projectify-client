export function getMonthDayNumbersForWeek(
  weekNumber: number,
  year: number
): number[] {
  const monthDayNumbers: number[] = [];
  const month = getMonthNumberForWeek(weekNumber, year);
  const date = new Date(year, month - 1, 1);
  const firstWeekNumber = getWeekNumber(date);
  const weekDiff = weekNumber - firstWeekNumber;
  date.setDate(date.getDate() + weekDiff * 7);
  for (let i = 0; i < 7; i++) {
    monthDayNumbers.push(date.getDate());
    date.setDate(date.getDate() + 1);
  }

  return monthDayNumbers;
}

function getWeekNumber(date: Date): number {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const diffInDays = Math.floor(
    (date.getTime() - firstDayOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  const weekNumber = Math.ceil((firstDayOfYear.getDay() + 1 + diffInDays) / 7);
  return weekNumber;
}

function getMonthNumberForWeek(weekNumber: number, year: number): number {
  for (let month = 0; month < 12; month++) {
    const firstDayOfMonth = new Date(year, month, 1);
    const firstWeekNumber = getWeekNumber(firstDayOfMonth);
    if (
      weekNumber >= firstWeekNumber &&
      weekNumber <= firstWeekNumber + getWeeksInMonth(year, month)
    ) {
      return month + 1;
    }
  }

  return -1;
}

function getWeeksInMonth(year: number, month: number): number {
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastWeekNumber = getWeekNumber(lastDayOfMonth);
  const weeksInMonth =
    lastWeekNumber - getWeekNumber(new Date(year, month, 1)) + 1;
  return weeksInMonth;
}
