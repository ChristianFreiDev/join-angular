import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { Contact } from '../../../../core/data/models/contact.interface';
import { FormsModule } from '@angular/forms';
import { getInitials, getUserColor } from '../../../../core/utils/user-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
})
export class ContactModalComponent {
  dialogRef = inject(DialogRef);

  contact: Contact = {
    name: '',
    id: '',
    color: getUserColor(),
    email: '',
    phone: '',
  };

  constructor(
    @Inject(DIALOG_DATA) public data: { contact: Contact; isEditing: boolean }
  ) {
    if (this.data.contact) {
      this.contact = this.data.contact;
    }
  }

  get initials() {
    return getInitials(this.contact.name);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
