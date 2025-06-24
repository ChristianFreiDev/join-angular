import { Component, computed, inject, Signal } from '@angular/core';
import { getInitials } from '../../../../core/utils/user-utils';
import { CommonModule } from '@angular/common';
import { Dialog } from '@angular/cdk/dialog';
import { ContactModalComponent } from '../contact-modal/contact-modal.component';
import { DataService } from '../../../../core/data/data.service';
import { ClickOutsideDirective } from '../../../../core/directives/click-outside.directive';

@Component({
  selector: 'app-contact-profile',
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './contact-profile.component.html',
  styleUrl: './contact-profile.component.scss',
})
export class ContactProfileComponent {
  dialog = inject(Dialog);
  dataService = inject(DataService);
  contact = this.dataService.selectedContact;
  isMoreMenuActive: boolean = false;

  initials: Signal<string> = computed(() => {
    const name = this.contact()?.name;
    if (name) {
      return getInitials(name);
    } else {
      return '';
    }
  });

  /**
   * This method toggles the more menu.
   */
  showOrHideDropDownMenu(bool?: boolean): void {
    if (bool === undefined) {
      this.isMoreMenuActive = !this.isMoreMenuActive;
    } else if (bool !== this.isMoreMenuActive) {
      this.isMoreMenuActive = bool;
    }
  }

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
    this.isMoreMenuActive = false;
  }

  /**
   * This method removes a contact.
   */
  async deleteContact(): Promise<void> {
    this.isMoreMenuActive = false;
    const contact = this.contact();
    if (contact) {
      try {
        await this.dataService.deleteContact(contact.id);
      } catch (error) {
        Promise.reject('Contact could not be deleted.');
      }
    }
  }
}
