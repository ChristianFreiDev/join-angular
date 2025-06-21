import { DialogRef } from '@angular/cdk/dialog';
import { Component, HostListener, inject } from '@angular/core';

@Component({
  selector: 'app-signup-message',
  imports: [],
  templateUrl: './signup-message.component.html',
  styleUrl: './signup-message.component.scss'
})
export class SignupMessageComponent {
  dialogRef = inject(DialogRef);

@HostListener('animationend', ['$event'])
  closeDialog() {
    this.dialogRef.close();
  }
}