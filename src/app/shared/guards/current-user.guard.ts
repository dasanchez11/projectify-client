import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { inject } from '@angular/core';
import { map, take } from 'rxjs';

export const currentUserGuard: CanActivateFn = (route, state) => {
  const currentUserService: CurrentUserService = inject(CurrentUserService);
  const router: Router = inject(Router);
  return currentUserService.currentUser$.pipe(
    take(1),
    map((currentUser) => {
      const authorized = !!currentUser;
      if (authorized) {
        return true;
      }
      return router.createUrlTree(['/auth/login']);
    })
  );
};
