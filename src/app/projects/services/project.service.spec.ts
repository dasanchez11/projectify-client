import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
import { BehaviorSubject } from 'rxjs';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectService],
    });
    service = TestBed.inject(ProjectService);
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
