import { TestBed } from '@angular/core/testing';
import { ProjectHttpService } from './project-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ProjectService } from './project.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { finalize, of } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { mockProjects } from '../tests-utils/mock-projects';
import { cleanStylesFromDom } from '../../shared/test/test-helper';

describe('ProjectHttpService', () => {
  let service: ProjectHttpService;
  let mockNotification: NotificationService;
  let mockProjectService: ProjectService;
  let mockHttpClient: HttpTestingController;
  let baseUrl = 'http://localhost:3002';
  const authRoute = '?authRoute=true';

  beforeEach(() => {
    mockNotification = jasmine.createSpyObj('notificationService', [
      'openSnackBar',
    ]);

    mockProjectService = {
      setIsLoading$: jasmine.createSpy('').and.returnValue(of(true)),
    } as unknown as ProjectService;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        ProjectHttpService,
        { provide: ProjectService, useValue: mockProjectService },
        { provide: NotificationService, useValue: mockNotification },
      ],
    });
    service = TestBed.inject(ProjectHttpService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Should getAllprojects', () => {
    it('should get all projects success', () => {
      const restUrl = '/projects';
      const url = baseUrl + restUrl;
      service
        .getAllProjects()
        .pipe(
          finalize(() => {
            expect(mockProjectService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockProjectService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(value).toEqual(mockProjects);
          },
          error: (error) => {},
        });

      const request = mockHttpClient.expectOne(url + authRoute);
      expect(request.request.method).toEqual('GET');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: mockProjects });
    });

    it('should get all projects failure', () => {
      const restUrl = '/projects';
      const url = baseUrl + restUrl;

      service.getAllProjects().subscribe({
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
});
