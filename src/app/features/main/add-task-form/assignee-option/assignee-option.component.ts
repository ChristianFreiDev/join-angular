import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CheckboxComponent } from '../../../../shared/checkbox/checkbox.component';
import { Contact } from '../../../../core/data/models/contact.interface';
import { CommonModule } from '@angular/common';
import { getInitials } from '../../../../core/utils/user-utils';

@Component({
  selector: 'app-assignee-option',
  imports: [CheckboxComponent, CommonModule],
  host: {
    '[class.assigned]': 'isAssigned',
    '(click)': 'toggleAssignment()'
  },
  templateUrl: './assignee-option.component.html',
  styleUrl: './assignee-option.component.scss'
})
export class AssigneeOptionComponent {
  @Input() assignee!: Contact;
  @Input() isAssigned: boolean = false;
  @Output() selectEvent = new EventEmitter<string>();
  @Output() deselectEvent = new EventEmitter<string>();
  @ViewChild(CheckboxComponent) checkbox!: CheckboxComponent;

  initials: string = 'G';

  ngOnInit() {
    this.initials = getInitials(this.assignee.name);
  }

  toggleAssignment() {
    this.isAssigned = !this.isAssigned;
    if (this.isAssigned) {
      this.selectEvent.emit(this.assignee.id);
    } else {
      this.deselectEvent.emit(this.assignee.id);
    }
    if (this.checkbox.checked != this.isAssigned) {
      this.checkbox.checked = this.isAssigned;
    }
  }
}
