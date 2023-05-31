import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';

describe('StorageService', () => {
  let service: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService],
    });
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set element', () => {
    spyOn(localStorage, 'setItem');
    service.setElement<string>('name', 'value');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('should get element', () => {
    spyOn(localStorage, 'getItem');
    spyOn(JSON, 'parse');
    service.getElement<string>('name');
    expect(localStorage.getItem).toHaveBeenCalledTimes(1);
  });

  it('should clear item', () => {
    spyOn(localStorage, 'removeItem');
    service.clearItem('name');
    expect(localStorage.removeItem).toHaveBeenCalledTimes(1);
  });
});
