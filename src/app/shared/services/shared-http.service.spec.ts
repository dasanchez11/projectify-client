import { TestBed } from '@angular/core/testing';

import { SharedHttpService } from './shared-http.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { cleanStylesFromDom } from '../test/test-helper';
import { mockProjects } from '../../projects/tests-utils/mock-projects';

describe('SharedHttpService', () => {
  let service: SharedHttpService;
  let mockHttpClient: HttpTestingController;
  let baseUrl = 'http://localhost:3002';
  const authRoute = '?authRoute=true';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SharedHttpService],
    });
    service = TestBed.inject(SharedHttpService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    mockHttpClient.verify();
    cleanStylesFromDom();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all projects success', () => {
    const restUrl = '/projects';
    const url = baseUrl + restUrl;
    service.getAllProjects().subscribe({
      next: (value) => {
        expect(value).toEqual(mockProjects);
      },
    });

    const request = mockHttpClient.expectOne(url + authRoute);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush({ message: 'success login', data: mockProjects });
  });

  it('should get all projects success', () => {
    const restUrl = '/projects';
    const url = baseUrl + restUrl;
    service.getAllProjects().subscribe({
      next: (value) => {
        expect(value).toEqual(false);
      },
    });

    const request = mockHttpClient.expectOne(url + authRoute);
    expect(request.request.method).toEqual('GET');
    expect(request.request.url).toEqual(url);
    request.flush({ message: 'success login' });
  });
});
