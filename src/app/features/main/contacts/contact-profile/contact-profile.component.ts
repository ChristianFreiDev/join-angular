import { Component, computed, inject, Input, Signal } from '@angular/core';
import { getInitials } from '../../../../core/utils/user-utils';
import { Contact } from '../../../../core/data/models/contact.interface';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss',
})
export class ContactProfileComponent {
  dialog = inject(Dialog);
  @Input() contact!: Signal<Contact | undefined>;

  initials: Signal<string> = computed(() => {
    const name = this.contact()?.name;
    if (name) {
      return getInitials(name);
    } else {
      return '';
    }
  });

  editContact(): void {
    this.dialog.open(ContactModalComponent, {
      data: {
        contact: this.contact(),
        isEditing: true,
      },
    });
  }
}
