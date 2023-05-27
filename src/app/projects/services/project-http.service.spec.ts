import { TestBed } from '@angular/core/testing';

import { ProjectHttpService } from './project-http.service';

describe('ProjectHttpService', () => {
  let service: ProjectHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
