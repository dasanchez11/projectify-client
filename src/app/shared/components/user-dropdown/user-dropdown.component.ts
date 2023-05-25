import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.scss'],
})
export class UserDropdownComponent {
  @Input() userName?: string;
  constructor() {} // private currentUserService: CurrentUserService

  handleLogout() {
    // this.currentUserService.logOut();
  }
}
