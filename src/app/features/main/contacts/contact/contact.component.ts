import { Component, Input } from '@angular/core';
import { Contact } from '../../../../core/data/models/contact.interface';
import { getInitials } from '../../../../core/utils/user-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  @Input() contact!: Contact;

  get initials() {
    return getInitials(this.contact.name);
  }
}
