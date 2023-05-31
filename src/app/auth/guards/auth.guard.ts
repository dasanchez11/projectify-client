import { Injectable, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { Observable, map, take } from 'rxjs';

@Injectable()
export class authGuard implements CanActivate {
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
          return this.router.createUrlTree(['/projects']);
        }
        return true;
      })
    );
  }
}
