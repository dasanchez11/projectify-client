import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoadingSpinnerComponent } from '../shared/components/loading-spinner/loading-spinner.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from './services/auth.service';
import { AuthHttpService } from './services/auth-http.service';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { authGuard } from './guards/auth.guard';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    LoadingSpinnerComponent,
    MatIconModule,
    MatButtonModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [AuthService, AuthHttpService, authGuard],
})
export class AuthModule {}
