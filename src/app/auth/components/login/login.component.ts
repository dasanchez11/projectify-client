import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../services/auth-http.service';
import { LoginCredentials } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
import { CurrentUserService } from '../../../shared/services/current-user.service';
import { Subject, distinctUntilChanged, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  readonly #unsubscribe$ = new Subject<void>();
  visiblePassword: boolean = false;
  loading: boolean = false;

  constructor(
    private authHttp: AuthHttpService,
    private authService: AuthService,
    private currentUserService: CurrentUserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isLoading$
      .pipe(takeUntil(this.#unsubscribe$), distinctUntilChanged())
      .subscribe((value) => {
        this.loading = value;
      });
  }

  loginForm = new FormGroup({
    email: new FormControl('diego@example.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('password', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.authHttp
        .login(this.loginForm.value as LoginCredentials)
        .subscribe((value) => {
          if (value) {
            this.router.navigate(['/projects']);
          }
        });
    }
  }

  toggleVisibility() {
    this.visiblePassword = !this.visiblePassword;
  }

  getControl(name: string) {
    return <FormControl>this.loginForm.get(name);
  }

  ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
