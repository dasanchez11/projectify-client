import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  setElement<T>(name: string, value: T) {
    localStorage.setItem(name, JSON.stringify(value));
  }

  getElement<T>(name: string): T | null {
    const value = localStorage.getItem(name);
    if (value) {
      return <T>JSON.parse(value);
    }
    return null;
  }
}
