import { Injectable } from '@angular/core';
import { ReportService } from './report.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BaseHttpResponse } from '../../shared/models/http-response.model';
import { ReportResponse } from '../models/report-response.model';
import { EMPTY, Observable, catchError, finalize, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { CreateReport } from '../models/create-report.model';
import { SharedHttpService } from '../../shared/services/shared-http.service';
import { Project } from '../../projects/models/project.model';

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
    private notificationService: NotificationService,
    private sharedHttp: SharedHttpService
  ) {}

  getWeeklyReport(isoWeek: string) {
    const url = this.baseUrl + `/reports/${isoWeek}`;
    this.reportService.setIsLoading$(true);
    return this.http.get<BaseHttpResponse<null>>(url, this.options).pipe(
      tap((response) => {
        if (response.data) {
          this.reportService.setReport$(response.data);
        }
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

  deleteReport(reportId: string) {
    const url = this.baseUrl + `/reports/${reportId}`;
    this.reportService.setIsLoading$(true);
    return this.http.delete<BaseHttpResponse<null>>(url, this.options).pipe(
      tap((response) => {
        if (response.message) {
          this.notificationService.openSnackBar(response.message, false);
          this.reportService.deleteReport(reportId);
        }
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

  editReport(reportId: string, hours: number, projectId: string) {
    const url = this.baseUrl + `/reports/${reportId}`;
    this.reportService.setIsLoading$(true);
    console.log(hours);
    return this.http
      .put<BaseHttpResponse<ReportResponse[]>>(url, { hours }, this.options)
      .pipe(
        tap((response) => {
          if (response.message) {
            this.notificationService.openSnackBar(response.message, false);
            this.reportService.editReport(reportId, hours);
          }
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

  createReport(newReport: CreateReport) {
    const url = this.baseUrl + `/reports`;
    this.reportService.setIsLoading$(true);
    return this.http
      .post<BaseHttpResponse<ReportResponse[]>>(url, newReport, this.options)
      .pipe(
        tap((response) => {
          if (response.message && response.data) {
            this.notificationService.openSnackBar(response.message, false);
            this.reportService.createReport(response.data[0]);
            return;
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

  getProjects() {
    this.reportService.setIsLoading$(true);
    return this.sharedHttp.getAllProjects().pipe(
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
