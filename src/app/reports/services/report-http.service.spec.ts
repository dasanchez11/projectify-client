import { TestBed } from '@angular/core/testing';

import { ReportHttpService } from './report-http.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ReportService } from './report.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { EMPTY, finalize, of } from 'rxjs';
import { SharedHttpService } from '../../shared/services/shared-http.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { mockReport } from '../test-utils/mock-reports';
import { cleanStylesFromDom } from '../../shared/test/test-helper';

describe('ReportHttpService', () => {
  let service: ReportHttpService;
  let mockNotification: NotificationService;
  let mockReportService: ReportService;
  let mockHttpClient: HttpTestingController;
  let mockSharedHttp: SharedHttpService;
  let baseUrl = 'http://localhost:3002';
  const authRoute = '?authRoute=true';

  beforeEach(() => {
    mockNotification = jasmine.createSpyObj('notificationService', [
      'openSnackBar',
    ]);

    mockSharedHttp = {
      getAllProjects: jasmine.createSpy('').and.returnValue(of(true)),
    } as unknown as SharedHttpService;

    // mockSharedHttp = jasmine.createSpyObj('sharedHttp', ['getAllProjects']);

    mockReportService = {
      setIsLoading$: jasmine.createSpy('').and.returnValue(of(true)),
    } as unknown as ReportService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        ReportHttpService,
        { provide: ReportService, useValue: mockReportService },
        { provide: NotificationService, useValue: mockNotification },
        { provide: SharedHttpService, useValue: mockSharedHttp },
      ],
    });
    service = TestBed.inject(ReportHttpService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttpClient.verify();
    cleanStylesFromDom();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Should getWeeklyReport', () => {
    it('should get all reports that week success', () => {
      const restUrl = '/reports/week';
      const url = baseUrl + restUrl;
      service
        .getWeeklyReport('week')
        .pipe(
          finalize(() => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(value.data).toEqual([mockReport]);
          },
          error: (error) => {},
        });

      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: [mockReport] });
    });

    it('should get all reports that week failure', () => {
      const restUrl = '/reports/week';
      const url = baseUrl + restUrl;

      service.getWeeklyReport('week').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error.statusText).toBe('Not Found');
        },
      });
      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Should delete Report', () => {
    it('should delete report that week success', () => {
      const restUrl = '/reports/id';
      const url = baseUrl + restUrl;
      service
        .deleteReport('id')
        .pipe(
          finalize(() => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(value.message).toEqual('success');
          },
          error: (error) => {},
        });

      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('DELETE');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: { message: 'success' } });
    });

    it('should delete report that week failure', () => {
      const restUrl = '/reports/id';
      const url = baseUrl + restUrl;

      service.deleteReport('id').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error.statusText).toBe('Not Found');
        },
      });
      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('DELETE');
      expect(request.request.url).toEqual(url);
      request.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Should editReport', () => {
    it('should edit report that week success', () => {
      const restUrl = '/reports/id';
      const url = baseUrl + restUrl;
      service
        .editReport('id', 20, 'pid')
        .pipe(
          finalize(() => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(value.data).toEqual([mockReport]);
          },
          error: (error) => {},
        });

      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('PUT');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: [mockReport] });
    });

    it('should edit report that week failure', () => {
      const restUrl = '/reports/id';
      const url = baseUrl + restUrl;

      service.editReport('id', 20, 'pid').subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error.statusText).toBe('Not Found');
        },
      });
      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('PUT');
      expect(request.request.url).toEqual(url);
      request.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Should createReport', () => {
    it('should create report that week success', () => {
      const restUrl = '/reports';
      const url = baseUrl + restUrl;
      service
        .createReport(mockReport)
        .pipe(
          finalize(() => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockReportService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(value.data).toEqual([mockReport]);
          },
          error: (error) => {},
        });

      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: [mockReport] });
    });

    it('should create report that week failure', () => {
      const restUrl = '/reports';
      const url = baseUrl + restUrl;

      service.createReport(mockReport).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error.statusText).toBe('Not Found');
        },
      });
      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  // xdescribe('should getProjects', () => {
  //   spyOn(mockSharedHttp, 'getAllProjects').and.returnValue(of(false));
  //   // mockSharedHttp.getAllProjects = jasmine
  //   //   .createSpy()
  //   //   .and.returnValue(of(false));
  //   service.getProjects().subscribe();
  //   // expect(mockNotification).toHaveBeenCalledTimes(1);
  // });
});
