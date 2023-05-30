import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { CurrentUserService } from '../../shared/services/current-user.service';

describe('authGuard', () => {
  let mockRouter: any;
  let mockCurrentUserService: any;
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    mockCurrentUserService = jasmine.createSpyObj(mockCurrentUserService, [
      'currentUser$',
    ]);
    mockRouter = jasmine.createSpyObj(mockRouter, ['navigate']);
    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: Router, useValue: mockRouter },
        { provide: CurrentUserService, useValue: mockCurrentUserService },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
