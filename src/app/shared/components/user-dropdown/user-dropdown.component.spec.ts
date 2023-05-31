import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDropdownComponent } from './user-dropdown.component';
import { CurrentUserService } from '../../services/current-user.service';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared.module';
import { cleanStylesFromDom } from '../../test/test-helper';

describe('UserDropdownComponent', () => {
  let component: UserDropdownComponent;
  let fixture: ComponentFixture<UserDropdownComponent>;
  let mockCurrentUser: CurrentUserService;
  let mockStorage: StorageService;
  let mockRouter: Router;

  beforeEach(async () => {
    mockCurrentUser = jasmine.createSpyObj('currentUserService', [
      'setCurrentUser$',
    ]);
    mockStorage = jasmine.createSpyObj('storageService', ['clearItem']);
    mockRouter = jasmine.createSpyObj('router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [UserDropdownComponent],
      imports: [SharedModule],
      providers: [
        { provide: CurrentUserService, useValue: mockCurrentUser },
        { provide: StorageService, useValue: mockStorage },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    cleanStylesFromDom();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handleLogout', () => {
    component.handleLogout();
    expect(mockCurrentUser.setCurrentUser$).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    expect(mockStorage.clearItem).toHaveBeenCalledTimes(1);
  });
});
