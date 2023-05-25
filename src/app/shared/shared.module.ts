import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CurrentUserService } from './services/current-user.service';

@NgModule({
  declarations: [HeaderComponent, UserDropdownComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  exports: [HeaderComponent],
  providers: [CurrentUserService],
})
export class SharedModule {}
