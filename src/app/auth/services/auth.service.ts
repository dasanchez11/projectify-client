import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

  get isLoading$(): Observable<boolean> {
    return this._isLoading$.asObservable();
  }

  setIsLoading$(value: boolean) {
    this._isLoading$.next(value);
  }
}
