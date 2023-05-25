import { Component, OnInit } from '@angular/core';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { CurrentUserService } from '../../services/current-user.service';
import { CurrentUser } from '../../models/current-user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  readonly #unsubscribe$ = new Subject<void>();
  currentUser!: CurrentUser;
  username: string | undefined = '';

  constructor(private currentUserService: CurrentUserService) {}

  ngOnInit(): void {
    this.currentUserService.currentUser$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((user) => {
        if (!user) return;
        this.username = user.name;
        this.isLoggedIn = !!user;
      });
  }

  public ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
