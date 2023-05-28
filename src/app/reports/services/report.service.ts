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
}
