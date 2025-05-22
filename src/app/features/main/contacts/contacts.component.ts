import { Component, inject, signal, Signal } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { Contact } from '../../../core/data/models/contact.interface';
import { ContactComponent } from './contact/contact.component';
import { ContactProfileComponent } from './contact-profile/contact-profile.component';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent, ContactProfileComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  dataService = inject(DataService);
  contacts: Signal<Contact[]> = this.dataService.contacts;
  selectedContact = signal<Contact | undefined>(undefined);
  selectContact(contact: Contact) {
    this.selectedContact.set(contact);
  }
}
