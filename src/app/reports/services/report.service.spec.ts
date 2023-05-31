import { TestBed } from '@angular/core/testing';

import { ReportService } from './report.service';
import { BehaviorSubject } from 'rxjs';
import { Report } from '../models/report.model';
import { mockReport } from '../test-utils/mock-reports';

describe('ReportService', () => {
  let service: ReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportService],
    });
    service = TestBed.inject(ReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set is loading', () => {
    const intitialValue = service['_isLoading$'].getValue();
    service.setIsLoading$(true);
    const changedValue = service['_isLoading$'].getValue();
    expect(intitialValue).toBe(false);
    expect(changedValue).toBe(true);
  });

  it('should get is loading', () => {
    (service['_isLoading$'] as any) = new BehaviorSubject<boolean>(true);
    const result = service.isLoading$;
    result.subscribe((value) => {
      expect(value).toEqual(true);
    });
  });

  it('should get reports', () => {
    (service['_report$'] as any) = new BehaviorSubject<Report[]>([mockReport]);
    const result = service.report$;
    result.subscribe((value) => {
      expect(value).toEqual([mockReport]);
    });
  });

  it('should set reports', () => {
    (service['_report$'] as any) = new BehaviorSubject<Report[]>([]);
    const intitialValue = service['_report$'].getValue();
    service.setReport$([mockReport]);
    const changedValue = service['_report$'].getValue();
    expect(intitialValue).toEqual([]);
    expect(changedValue).toEqual([mockReport]);
  });

  it('should delete report', () => {
    service.setReport$([mockReport]);
    service.deleteReport('id');
    const result = service['_report$'].getValue();
    expect(result).toEqual([]);
  });

  it('should edit report', () => {
    service.setReport$([mockReport]);
    const newReport = { ...mockReport, hours: 10 };
    service.editReport('id', 10);
    const result = service['_report$'].getValue();
    expect(result).toEqual([newReport]);
  });

  it('should create report', () => {
    service.setReport$([]);
    const newReport = mockReport;
    service.createReport(newReport);
    const result = service['_report$'].getValue();
    expect(result).toEqual([newReport]);
  });
});
