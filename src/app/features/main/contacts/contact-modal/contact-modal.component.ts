import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject, inject } from '@angular/core';
import { Contact } from '../../../../core/data/models/contact.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { getInitials, getUserColor } from '../../../../core/utils/user-utils';
import { CommonModule } from '@angular/common';
import { DataService } from '../../../../core/data/data.service';

@Component({
  selector: 'app-contact-modal',
  imports: [FormsModule, CommonModule],
  templateUrl: './contact-modal.component.html',
  styleUrl: './contact-modal.component.scss',
})
export class ContactModalComponent {
  dialogRef = inject(DialogRef);
  dataService = inject(DataService);

  isFormDisabled: boolean = false;

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

  /**
   * This getter returns the intials of a contact name.
   */
  get initials(): string {
    return getInitials(this.contact.name);
  }

  /**
   * This method saves a contact.
   */
  saveContact(ngForm: NgForm): void {
    this.isFormDisabled = true;
    if (ngForm.submitted && ngForm.valid) {
      if (this.data.isEditing) {
        this.dataService.updateContact(this.contact, this.contact.id);
      } else {
        this.dataService.addContact(this.contact);
      }
    }
    this.closeModal();
  }

  /**
   * This method removes a contact.
   */
  deleteContact(): void {
    this.isFormDisabled = true;
    this.dataService.deleteContact(this.contact.id);
    this.closeModal();
  }

  /**
   * This method closes the dialog.
   */
  closeModal(): void {
    this.dialogRef.close();
  }
}
