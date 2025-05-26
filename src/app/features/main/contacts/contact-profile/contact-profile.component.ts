import { Component, computed, inject, Input, Signal } from '@angular/core';
import { getInitials } from '../../../../core/utils/name-utils';
import { Contact } from '../../../../core/data/models/contact.interface';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { EditContactModalComponent } from './edit-contact-modal/edit-contact-modal.component';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss'
})
export class ContactProfileComponent {
  dialog = inject(Dialog);
  @Input() contact!: Signal<Contact | undefined>;

  initials = computed(() => {
    const name = this.contact()?.name;
    if (name) {
      return getInitials(name);
    } else {
      return '';
    }
  });

  editContact() {
    this.dialog.open(EditContactModalComponent);
  }
}
