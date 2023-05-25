import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  visiblePassword: boolean = false;
  // loginSubscription!: Subscription;
  loading: boolean = false;

  constructor() // private currentUser: CurrentUserService // private currentUserFetch: CurrentUserFetchService, // private router: Router,
  {}

  ngOnInit(): void {
    // this.currentUser.loading.subscribe((value) => {
    //   this.loading = value;
    // });
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  onSubmit() {
    // if (this.loginForm.valid) {
    //   this.loginSubscription = this.currentUserFetch
    //     .postLogin(<Ilogin>this.loginForm.value)
    //     .subscribe((value) => {
    //       value && this.router.navigate(['home']);
    //     });
    // }
  }

  toggleVisibility() {
    this.visiblePassword = !this.visiblePassword;
  }

  getControl(name: string) {
    return <FormControl>this.loginForm.get(name);
  }
}
