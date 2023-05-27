import { Component, Input } from '@angular/core';
import { CurrentUserService } from '../../services/current-user.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent {
  @Input() userName?: string;
  constructor(
    private currentUserService: CurrentUserService,
    private storageService: StorageService,
    private router: Router
  ) {}

  handleLogout() {
    this.storageService.clearItem('currentUser');
    this.currentUserService.setCurrentUser$(null);
    this.router.navigate(['auth/login']);
  }
}
