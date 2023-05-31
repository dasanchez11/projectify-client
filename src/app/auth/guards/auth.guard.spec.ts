import { TestBed } from '@angular/core/testing';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { authGuard } from './auth.guard';
import { CurrentUserService } from '../../shared/services/current-user.service';
import { of } from 'rxjs';

describe('authGuard', () => {
  let guard: authGuard;
  let mockCurrentUserService: CurrentUserService;
  let mockRouter: Router;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeRouterState = (url: string): RouterStateSnapshot => {
    return {
      url,
    } as RouterStateSnapshot;
  };

  describe('not logged in', () => {
    beforeEach(() => {
      mockCurrentUserService = {
        currentUser$: of(null),
      } as unknown as CurrentUserService;
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);

      TestBed.configureTestingModule({
        providers: [
          authGuard,
          { provide: Router, useValue: mockRouter },
          { provide: CurrentUserService, useValue: mockCurrentUserService },
        ],
      });
      guard = TestBed.inject(authGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true if not logged', () => {
      const res$ = guard
        .canActivate(dummyRoute, fakeRouterState('fakeVal'))
        .subscribe((value) => {
          expect(value).toBe(true);
        });
    });
  });

  describe('logged in', () => {
    beforeEach(() => {
      mockCurrentUserService = {
        currentUser$: of(true),
      } as unknown as CurrentUserService;
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);

      TestBed.configureTestingModule({
        providers: [
          authGuard,
          { provide: Router, useValue: mockRouter },
          { provide: CurrentUserService, useValue: mockCurrentUserService },
        ],
      });
      guard = TestBed.inject(authGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true if not logged', () => {
      const res$ = guard
        .canActivate(dummyRoute, fakeRouterState('fakeVal'))
        .subscribe((value) => {
          expect(mockRouter.createUrlTree).toHaveBeenCalledTimes(1);
        });
    });
  });
});
