import { DialogRef } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-signup-message',
  imports: [],
  host: {
    'class': 'sliding-message-container',
    '(animationend)': 'closeDialog()'
  },
  templateUrl: './signup-message.component.html',
  styleUrl: './signup-message.component.scss'
})
export class SignupMessageComponent {
  dialogRef = inject(DialogRef);

  closeDialog() {
    this.dialogRef.close();
  }
}