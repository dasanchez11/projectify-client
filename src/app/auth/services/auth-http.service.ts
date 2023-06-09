import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginCredentials } from '../models/login.model';
import { AuthService } from './auth.service';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { NotificationService } from '../../shared/services/notification.service';
import { CurrentUser } from '../../shared/models/current-user.model';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { BaseHttpResponse } from '../../shared/models/http-response.model';
import { RegisterCredentials } from '../models/register.model';
import { StorageService } from '../../shared/services/storage.service';

@Injectable()
export class AuthHttpService {
  private readonly baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private notificatonService: NotificationService,
    private currentUserService: CurrentUserService,
    private storageService: StorageService
  ) {}

  login(
    credentials: LoginCredentials
  ): Observable<BaseHttpResponse<CurrentUser> | boolean> {
    const url = this.baseUrl + '/auth/login';
    this.authService.setIsLoading$(true);
    return this.http.post<BaseHttpResponse<CurrentUser>>(url, credentials).pipe(
      tap((response) => {
        this.notificatonService.openSnackBar(response.message, false);
        if (response.data) {
          this.storageService.setElement('currentUser', response.data);
          return this.currentUserService.setCurrentUser$(response.data);
        }
      }),
      catchError((error) => {
        const returnError = error.error.message || error.message;
        this.notificatonService.openSnackBar(returnError, true);
        throw error;
      }),
      finalize(() => {
        this.authService.setIsLoading$(false);
      })
    );
  }

  register(
    credentials: RegisterCredentials
  ): Observable<BaseHttpResponse<void> | boolean> {
    const url = this.baseUrl + '/auth/register';
    this.authService.setIsLoading$(true);
    return this.http.post<BaseHttpResponse<void>>(url, credentials).pipe(
      tap((response) => {
        this.notificatonService.openSnackBar(response.message, false);
      }),
      catchError((error) => {
        const returnError = error.error.message || error.message;
        this.notificatonService.openSnackBar(returnError, true);
        throw error;
      }),
      finalize(() => {
        this.authService.setIsLoading$(false);
      })
    );
  }
}
