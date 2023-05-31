import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CurrentUserService } from './shared/services/current-user.service';
import { StorageService } from './shared/services/storage.service';

describe('AppComponent', () => {
  let mockCurrentUserService: CurrentUserService;
  let mockStorageService: StorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [
        { provide: CurrentUserService, useValue: mockCurrentUserService },
        { provide: StorageService, useValue: mockStorageService },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
