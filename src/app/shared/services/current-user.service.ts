import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';

@Injectable()
export class CurrentUserService {
  private readonly _currentUser$ = new BehaviorSubject<CurrentUser | null>(
    null
  );

  get currentUser$(): Observable<CurrentUser | null> {
    return this._currentUser$.asObservable();
  }

  get loggedIn$(): Observable<boolean> {
    return this._currentUser$.asObservable().pipe(map((user) => !!user));
  }

  setCurrentUser$(user: CurrentUser) {
    this._currentUser$.next(user);
  }
}
