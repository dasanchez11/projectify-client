import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set is loading', () => {
    const intitialValue = service['_isLoading$'].getValue();
    service.setIsLoading$(true);
    const changedValue = service['_isLoading$'].getValue();
    expect(intitialValue).toBe(false);
    expect(changedValue).toBe(true);
  });

  it('should get is loading', () => {
    (service['_isLoading$'] as any) = new BehaviorSubject<boolean>(true);
    const result = service.isLoading$;
    result.subscribe((value) => {
      expect(value).toEqual(true);
    });
  });
});
