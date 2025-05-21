import { Component, inject, Signal } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { Contact } from '../../../core/data/models/contact.interface';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-contacts',
  imports: [ContactComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss'
})
export class ContactsComponent {
  dataService = inject(DataService);
  contacts: Signal<Contact[]> = this.dataService.contacts;
}
