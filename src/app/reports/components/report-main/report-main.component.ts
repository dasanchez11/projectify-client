import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  getIsoDateFromCurrentDate,
  getNextWeek,
  getPrevWeek,
  getWeek,
  getWeekAndYearFromIsoDate,
  getMontName,
} from '../../utils/reports.utils';
import { WeekMap } from '../../models/week-map.model';
import { getMonthDayNumbersForWeek } from '../../utils/date.utils';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss'],
})
export class ReportMainComponent implements OnInit {
  weekMap: WeekMap[] = [];
  weekNumber!: number;
  yearNumber!: number;
  monthName!: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      const week = params.get('week-value');
      let validWeek = false;
      if (week) {
        validWeek = this.validDateFormat(week);
        const { currentWeek, currentYear } = getWeekAndYearFromIsoDate(week);
        this.weekNumber = currentWeek;
        this.yearNumber = currentYear;
        this.weekMap = getWeek(currentWeek, currentYear);
        this.monthName = getMontName(currentWeek, currentYear);
      } else {
        const { weekNumber, year } = getIsoDateFromCurrentDate();
        this.router.navigate([`reports/week/${year}-W${weekNumber}`]);
      }
    });
  }

  validDateFormat(input: string): boolean {
    const regExp = new RegExp(/^20\d{2}-W\d{2}$/);
    const valid = regExp.test(input);
    if (!valid) {
      this.router.navigate(['/projects']);
    }
    return valid;
  }

  handleClick(right: boolean) {
    let followWeek;
    let followYear;
    if (right) {
      const { nexYear, nextWeek } = getNextWeek(
        this.weekNumber,
        this.yearNumber
      );
      followWeek = nextWeek;
      followYear = nexYear;
    } else {
      const { prevWeek, prevYear } = getPrevWeek(
        this.weekNumber,
        this.yearNumber
      );
      followWeek = prevWeek;
      followYear = prevYear;
    }
    this.router.navigate([`reports/week/${followYear}-W${followWeek}`]);
  }
}

const weekNumber = 22;
const year = 2023;
const monthDayNumbers = getMonthDayNumbersForWeek(weekNumber, year);
console.log(monthDayNumbers);
