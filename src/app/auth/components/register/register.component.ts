import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthHttpService } from '../../services/auth-http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading: boolean = false;
  visiblePassword: boolean = false;
  visibleConfirm: boolean = false;

  constructor(private authHttp: AuthHttpService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstname: new FormControl('Diego', [Validators.required]),
        lastname: new FormControl('Sanchez', [Validators.required]),
        email: new FormControl('diego@example.com', [
          Validators.required,
          Validators.email,
        ]),
        password: new FormControl('password', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('password', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      []
    );
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { firstname, lastname, email, password } = this.registerForm.value;
      this.authHttp
        .register({ firstname, lastname, email, password })
        .subscribe((value) => {
          if (value) {
            this.router.navigate(['auth/login']);
          }
        });
    }
  }

  toggleVisibility(name: string) {
    if (name === 'password') {
      this.visiblePassword = !this.visiblePassword;
    } else {
      this.visibleConfirm = !this.visibleConfirm;
    }
  }

  getControl(name: string) {
    return <FormControl>this.registerForm.get(name);
  }
}
