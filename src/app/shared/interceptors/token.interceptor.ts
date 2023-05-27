import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { CurrentUser } from '../models/current-user.model';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser =
      this.storageService.getElement<CurrentUser>('currentUser');
    const authRoute = req.params.get('authRoute');
    let valid = false;

    if (currentUser?.expiresAt) {
      valid = this.tokenExpired(currentUser.expiresAt);
    }

    if (!currentUser?.token || !authRoute || !valid) {
      return next.handle(req);
    }

    const token = currentUser.token;

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(tokenizedRequest);
  }

  tokenExpired(expiration: number) {
    const valid = expiration > Date.now() / 1000;
    if (!valid) {
      this.storageService.clearItem('currentUser');
      this.router.navigate(['auth/login']);
      return false;
    }
    return valid;
  }
}
