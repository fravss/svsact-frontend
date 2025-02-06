import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-error-toast',
  imports: [CommonModule, MatIconModule ],
  templateUrl: './error-toast.component.html',
  styleUrl: './error-toast.component.scss'
})
export class ErrorToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      message: string;
      type: string;
    },
    public _snackRef: MatSnackBarRef<ErrorToastComponent>
  ) {}

}
