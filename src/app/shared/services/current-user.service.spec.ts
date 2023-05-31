import { TestBed } from '@angular/core/testing';

import { CurrentUserService } from './current-user.service';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';
import { cleanStylesFromDom } from '../test/test-helper';
import { mockCurrentUser } from '../../auth/test/mock-user';

describe('CurrentUserService', () => {
  let service: CurrentUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentUserService],
    });
    service = TestBed.inject(CurrentUserService);
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get current user', () => {
    service['_currentUser$'] = new BehaviorSubject<CurrentUser | null>(null);
    service.currentUser$.subscribe((value) => {
      expect(value).toBeNull();
    });
  });

  it('should set current user', () => {
    service['_currentUser$'] = new BehaviorSubject<CurrentUser | null>(null);
    service.setCurrentUser$(mockCurrentUser);
    const result = service['_currentUser$'].getValue();
    expect(result).toEqual(mockCurrentUser);
  });
});
