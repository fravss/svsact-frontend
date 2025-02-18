import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-toast',
  imports: [CommonModule, MatIconModule ],
  templateUrl: './success-toast.component.html',
  styleUrl: './success-toast.component.scss'
})
export class SuccessToastComponent {
  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: {
      message: string;
      type: string;
    },
    public _snackRef: MatSnackBarRef<SuccessToastComponent>
  ) {}

}