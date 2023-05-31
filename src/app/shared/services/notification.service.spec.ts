import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('NotificationService', () => {
  let service: NotificationService;
  let mockSnack: any;

  beforeEach(() => {
    mockSnack = jasmine.createSpyObj('_snack', ['open']);
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        NotificationService,
        {
          provide: MatSnackBar,
          useValue: mockSnack,
        },
      ],
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should open snackbar', () => {
    service.openSnackBar('message', true);
    expect(mockSnack.open).toHaveBeenCalledTimes(1);
  });
});
