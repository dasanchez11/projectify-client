import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { UserDropdownComponent } from './components/user-dropdown/user-dropdown.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NotificationService } from './services/notification.service';
import { StorageService } from './services/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedHttpService } from './services/shared-http.service';

@NgModule({
  declarations: [HeaderComponent, UserDropdownComponent],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  exports: [HeaderComponent],
  providers: [NotificationService, StorageService, SharedHttpService],
})
export class SharedModule {}
