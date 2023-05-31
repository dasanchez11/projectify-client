import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CurrentUserService } from '../services/current-user.service';
import { currentUserGuard } from './current-user.guard';
import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';

describe('curretnUserGuard', () => {
  let guard: currentUserGuard;
  let mockCurrentUserService: CurrentUserService;
  let mockRouter: Router;

  const dummyRoute = {} as ActivatedRouteSnapshot;
  const fakeRouterState = (url: string): RouterStateSnapshot => {
    return {
      url,
    } as RouterStateSnapshot;
  };

  describe('logged in', () => {
    beforeEach(() => {
      mockCurrentUserService = {
        currentUser$: of(true),
      } as unknown as CurrentUserService;
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);

      TestBed.configureTestingModule({
        providers: [
          currentUserGuard,
          { provide: Router, useValue: mockRouter },
          { provide: CurrentUserService, useValue: mockCurrentUserService },
        ],
      });
      guard = TestBed.inject(currentUserGuard);
    });

    it('should be created', () => {
      expect(guard).toBeTruthy();
    });

    it('should return true if logged', () => {
      const res$ = guard
        .canActivate(dummyRoute, fakeRouterState('fakeVal'))
        .subscribe((value) => {
          expect(value).toBe(true);
        });
    });
  });

  describe('not logged in', () => {
    beforeEach(() => {
      mockCurrentUserService = {
        currentUser$: of(null),
      } as unknown as CurrentUserService;
      mockRouter = jasmine.createSpyObj('router', ['createUrlTree']);

      TestBed.configureTestingModule({
        providers: [
          currentUserGuard,
          { provide: Router, useValue: mockRouter },
          { provide: CurrentUserService, useValue: mockCurrentUserService },
        ],
      });
      guard = TestBed.inject(currentUserGuard);
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
