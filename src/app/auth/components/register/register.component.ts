import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        username: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(8),
        ]),
      },
      []
    );
  }

  onSubmit() {}

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
