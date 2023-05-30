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
import { ReportHttpService } from '../../services/report-http.service';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-report-main',
  templateUrl: './report-main.component.html',
  styleUrls: ['./report-main.component.scss'],
})
export class ReportMainComponent implements OnInit {
  readonly #unsubscribe = new Subject<void>();
  weekMap: WeekMap[] = [];
  weekNumber!: number;
  yearNumber!: number;
  monthName!: string;
  weekIsoFormat!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private reportHttp: ReportHttpService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.#unsubscribe), distinctUntilChanged())
      .subscribe((params) => {
        const week = params.get('week-value');
        let validWeek = false;
        if (week) {
          validWeek = this.validDateFormat(week);
          const { currentWeek, currentYear } = getWeekAndYearFromIsoDate(week);
          this.weekIsoFormat = week;
          this.weekNumber = currentWeek;
          this.yearNumber = currentYear;
          this.weekMap = getWeek(currentWeek, currentYear);
          this.monthName = getMontName(currentWeek, currentYear);
        } else {
          const { weekNumber, year } = getIsoDateFromCurrentDate();
          this.router.navigate([`reports/week/${year}-W${weekNumber}`]);
        }
        if (validWeek && week) {
          this.reportHttp.getWeeklyReport(week).subscribe();
        }
      });
  }

  validDateFormat(input: string): boolean {
    const regExp = new RegExp(/^20\d{2}-W(0[1-9]|[1-4][0-9]|5[0-3])$/);
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

  ngOnDestroy(): void {
    this.#unsubscribe.next();
    this.#unsubscribe.complete();
  }
}
