import { Component, computed, inject, input, Input, Signal } from '@angular/core';
import { getInitials } from '../../../../core/utils/user-utils';
import { Contact } from '../../../../core/data/models/contact.interface';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { DataService } from '../../../../core/data/data.service';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss',
})
export class ContactProfileComponent {
  dialog = inject(Dialog);
  dataService = inject(DataService);
  contact = this.dataService.selectedContact;

  initials: Signal<string> = computed(() => {
    const name = this.contact()?.name;
    if (name) {
      return getInitials(name);
    } else {
      return '';
    }
  });

  /**
   * This method opens a dialog for editing a contact.
   */
  editContact(): void {
    this.dialog.open(ContactModalComponent, {
      data: {
        contact: this.contact(),
        isEditing: true,
      },
    });
  }

  /**
   * This method removes a contact.
   */
  deleteContact(): void {
    const contact = this.contact();
    if (contact) {
      this.dataService.deleteContact(contact.id);
    }
  }
}
