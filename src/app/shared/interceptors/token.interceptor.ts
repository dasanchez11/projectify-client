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

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private storageService: StorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser =
      this.storageService.getElement<CurrentUser>('currentUser');
    const authRoute = req.params.get('auth-route');

    if (!currentUser?.token || !authRoute) {
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
}
