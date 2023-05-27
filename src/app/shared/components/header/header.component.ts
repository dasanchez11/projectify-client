import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly #unsubscribe$ = new Subject<void>();
  firstname!: string;
  isLoggedIn!: boolean;

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((user) => {
        if (user) {
          this.firstname = user?.firstname;
          this.isLoggedIn = !!user;
        } else {
          this.firstname = '';
          this.isLoggedIn = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
