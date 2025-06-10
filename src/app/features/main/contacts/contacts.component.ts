import { Component, inject, Signal } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { Contact } from '../../../core/data/models/contact.interface';
import { ContactComponent } from './contact/contact.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';
import { Dialog } from '@angular/cdk/dialog';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent, ContactProfileComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  dataService = inject(DataService);
  dialog = inject(Dialog);
  contacts: Signal<Contact[]> = this.dataService.contacts;
  selectedContact = this.dataService.selectedContact;

  /**
   * This method selects or deselects (when passing in "undefined" as a parameter) a contact.
   */
  selectContact(contact: Contact | undefined): void {
    this.dataService.selectedContact.set(contact);
  }

  /**
   * This method adds a contact.
   */
  addContact(): void {
    this.dialog.open(ContactModalComponent, {
      data: {
        isEditing: false,
      },
    });
  }
}
