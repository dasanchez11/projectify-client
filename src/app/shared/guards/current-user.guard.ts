import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

@Injectable()
export class currentUserGuard implements CanActivate {
  constructor(
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.currentUserService.currentUser$.pipe(
      take(1),
      map((currentUser) => {
        const authorized = !!currentUser;
        if (authorized) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }
}
