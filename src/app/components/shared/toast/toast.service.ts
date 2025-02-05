import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ErrorToastComponent } from './error-toast/error-toast.component';
import { SuccessToastComponent } from './success-toast/success-toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  constructor(private readonly snackBar: MatSnackBar) {}

  callErrorToast(message: string): void {
    this.snackBar.openFromComponent(ErrorToastComponent, {
      duration: 3000,
      data: { message },
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
  callSuccessToast(message: string): void {
    this.snackBar.openFromComponent(SuccessToastComponent, {
      duration: 3000,
      data: { message },
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
