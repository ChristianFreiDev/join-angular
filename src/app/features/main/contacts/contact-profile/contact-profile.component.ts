import { Component, computed, Input, Signal } from '@angular/core';
import { getInitials } from '../../../../core/utils/name-utils';
import { Contact } from '../../../../core/data/models/contact.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss'
})
export class ContactProfileComponent {
  @Input() contact!: Signal<Contact | undefined>;

  initials = computed(() => {
    const name = this.contact()?.name;
    if (name) {
      return getInitials(name);
    } else {
      return '';
    }
  });
}
