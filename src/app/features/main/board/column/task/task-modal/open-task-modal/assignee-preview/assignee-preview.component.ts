import { Component, Input } from '@angular/core';
import { Contact } from '../../../../../../../../core/data/models/contact.interface';
import { getInitials } from '../../../../../../../../core/utils/user-utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignee-preview',
  imports: [CommonModule],
  templateUrl: './assignee-preview.component.html',
  styleUrl: './assignee-preview.component.scss'
})
export class AssigneePreviewComponent {
  @Input() assignee!: Contact;
  initials: string = 'G';

  ngOnInit() {
    this.initials = getInitials(this.assignee.name);
  }
}
