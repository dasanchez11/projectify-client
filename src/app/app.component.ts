import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from './shared/services/current-user.service';
import { StorageService } from './shared/services/storage.service';
import { CurrentUser } from './shared/models/current-user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private currentUserService: CurrentUserService,
    private storageService: StorageService
  ) {}
  ngOnInit(): void {
    const currentUser =
      this.storageService.getElement<CurrentUser>('currentUser');
    if (currentUser) {
      this.currentUserService.setCurrentUser$(currentUser);
    }
  }
}
