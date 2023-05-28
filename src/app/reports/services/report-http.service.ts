import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseHttpResponse } from '../../shared/models/http-response.model';
import { ReportResponse } from '../models/report-response.model';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ReportHttpService {
  baseUrl = environment.baseUrl;
  options = {
    params: {
      authRoute: true,
    },
  };
  constructor(
    private reportService: ReportService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  getWeeklyReport(isoWeek: string) {
    const url = this.baseUrl + `/reports/${isoWeek}`;
    this.reportService.setIsLoading$(true);
    return this.http
      .get<BaseHttpResponse<ReportResponse[]>>(url, this.options)
      .pipe(
        tap((response) => {
          if (response.data) {
            this.reportService.setReport$(response.data);
          }
          return false;
        }),
        catchError((error) => {
          this.notificationService.openSnackBar(error.error.message, true);
          return EMPTY;
        }),
        finalize(() => {
          this.reportService.setIsLoading$(false);
        })
      );
  }
}
