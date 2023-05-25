import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn!: boolean;
  readonly #unsubscribe$ = new Subject<void>();
  currentUser$!: Subscription;
  username: string | undefined = '';

  constructor() {} // private currentUserService: CurrentUserService

  ngOnInit(): void {
    // this.currentUser$ = this.currentUserService.currentUser
    //   .pipe(
    //     takeUntil(this.#unsubscribe$),
    //     distinctUntilChanged()
    //   )
    //   .subscribe((current) => {
    //     this.username = current?.username;
    //     this.isLoggedIn = !!current;
    //   });
  }

  public ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
