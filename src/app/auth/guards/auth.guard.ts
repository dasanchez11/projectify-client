import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const currentUserService: CurrentUserService = inject(CurrentUserService);
  const router: Router = inject(Router);
  return currentUserService.currentUser$.pipe(
    take(1),
    map((currentUser) => {
      const authorized = !!currentUser;
      if (authorized) {
        return router.createUrlTree(['/projects']);
      }
      return true;
    })
  );
};
