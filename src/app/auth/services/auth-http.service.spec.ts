import { TestBed } from '@angular/core/testing';
import { AuthHttpService } from './auth-http.service';
import { NotificationService } from '../../shared/services/notification.service';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { StorageService } from '../../shared/services/storage.service';
import { AuthService } from './auth.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockCurrentUser } from '../test/mock-user';
import { finalize, of } from 'rxjs';
import { cleanStylesFromDom } from '../../shared/test/test-helper';
import { RegisterCredentials } from '../models/register.model';

describe('AuthHttpService', () => {
  let service: AuthHttpService;
  let mockNotification: NotificationService;
  let mockCurrentUserService: CurrentUserService;
  let mockStorageService: StorageService;
  let mockAuthService: any;
  let mockHttpClient: HttpTestingController;
  let baseUrl = 'http://localhost:3002';

  beforeEach(() => {
    mockCurrentUserService = jasmine.createSpyObj('currentUserService', [
      'setCurrentUser$',
    ]);
    mockNotification = jasmine.createSpyObj('notificationService', [
      'openSnackBar',
    ]);
    mockStorageService = jasmine.createSpyObj('storageService', ['setElement']);
    mockAuthService = {
      setIsLoading$: jasmine.createSpy('').and.returnValue(of(true)),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [
        AuthHttpService,
        { provide: NotificationService, useValue: mockNotification },
        { provide: CurrentUserService, useValue: mockCurrentUserService },
        { provide: StorageService, useValue: mockStorageService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    });
    service = TestBed.inject(AuthHttpService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttpClient.verify();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Should login', () => {
    it('should login success', () => {
      const restUrl = '/auth/login';
      const url = baseUrl + restUrl;

      const credentials = { email: 'email', password: 'password' };
      service
        .login(credentials)
        .pipe(
          finalize(() => {
            expect(mockAuthService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockAuthService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
            expect(mockStorageService.setElement).toHaveBeenCalledTimes(1);
            expect(
              mockCurrentUserService.setCurrentUser$
            ).toHaveBeenCalledTimes(1);
          },
          error: (error) => {},
        });
      expect(mockAuthService.setIsLoading$).toHaveBeenCalledTimes(1);

      const request = mockHttpClient.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: mockCurrentUser });
    });

    it('should login failure', () => {
      const restUrl = '/auth/login';
      const url = baseUrl + restUrl;
      const credentials = { email: 'email', password: 'password' };
      service.login(credentials).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(error.statusText).toBe('Not Found');
        },
      });
      const request = mockHttpClient.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush('Not Found', { status: 404, statusText: 'Not Found' });
    });
  });

  describe('Should Register', () => {
    const registerCredentials: RegisterCredentials = {
      firstname: 'first',
      lastname: 'last',
      email: 'email',
      password: 'password',
    };

    it('should register success', () => {
      const restUrl = '/auth/register';
      const url = baseUrl + restUrl;

      service
        .register(registerCredentials)
        .pipe(
          finalize(() => {
            expect(mockAuthService.setIsLoading$).toHaveBeenCalledTimes(2);
          })
        )
        .subscribe({
          next: (value) => {
            expect(mockAuthService.setIsLoading$).toHaveBeenCalledTimes(1);
            expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          },
        });

      const request = mockHttpClient.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush({ message: 'success login', data: mockCurrentUser });
    });

    it('should register failure', () => {
      const restUrl = '/auth/register';
      const url = baseUrl + restUrl;

      service.register(registerCredentials).subscribe({
        error: (error) => {
          expect(error).toBeTruthy();
          expect(mockNotification.openSnackBar).toHaveBeenCalledTimes(1);
          expect(mockNotification.openSnackBar).toHaveBeenCalledWith(
            error.error.message,
            true
          );
          expect(error.error.message).toBe('Element not found');
        },
      });
      const request = mockHttpClient.expectOne(url);
      expect(request.request.method).toEqual('POST');
      expect(request.request.url).toEqual(url);
      request.flush(
        { message: 'Element not found' },
        { status: 404, statusText: 'Not Found' }
      );
    });
  });
});
