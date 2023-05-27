import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar(message: string, fail: boolean = false) {
    const color = fail ? 'snackbar_warn' : 'snackbar_success';
    this._snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['mat-toolbar', color],
    });
  }
}
