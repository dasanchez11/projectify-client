import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CurrentUser } from '../models/current-user.model';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private _currentUser$ = new BehaviorSubject<CurrentUser | null>(null);

  get currentUser$(): Observable<CurrentUser | null> {
    return this._currentUser$.asObservable();
  }

  setCurrentUser$(user: CurrentUser | null) {
    this._currentUser$.next(user);
  }
}
