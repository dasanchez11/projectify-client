import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReportResponse } from '../models/report-response.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);
  private readonly _report$ = new BehaviorSubject<ReportResponse[] | null>(
    null
  );

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  get report$(): Observable<ReportResponse[] | null> {
    return this._report$.asObservable();
  }

  setReport$(value: ReportResponse[]) {
    return this._report$.next(value);
  }

  setIsLoading$(value: boolean) {
    this._isLoading$.next(value);
  }

  deleteReport(deleteId: string) {
    const reports = this._report$.getValue();
    if (reports) {
      const newReports = reports.filter((item) => item._id !== deleteId);
      this.setReport$(newReports);
    }
  }

  editReport(reportId: string, hours: number) {
    const reports = this._report$.getValue();
    if (reports) {
      const newReports = reports.map((report) => {
        if (report._id === reportId) {
          return { ...report, hours };
        }
        return report;
      });
      this.setReport$(newReports);
    }
  }

  createReport(report: ReportResponse) {
    const reports = this._report$.getValue();
    if (reports) {
      const newReports = [...reports, report];
      this.setReport$(newReports);
    }
  }
}
