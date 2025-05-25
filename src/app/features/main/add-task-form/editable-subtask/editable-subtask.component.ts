import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: '[app-editable-subtask]',
  imports: [FormsModule],
  templateUrl: './editable-subtask.component.html',
  styleUrl: './editable-subtask.component.scss'
})
export class EditableSubtaskComponent {
  @Input() subtaskTitle!: string;
  @Output() saveEvent = new EventEmitter<string>();
  @Output() deleteEvent = new EventEmitter<boolean>();
  @ViewChild('editableTaskInput')
  set editableTaskInput(element: ElementRef) {
    if (element) {
      element.nativeElement.focus();
    }
  }
  isBeingEdited = false;

  editSubtask() {
    this.isBeingEdited = true;
  }

  saveSubtask() {
    this.isBeingEdited = false;
    this.saveEvent.emit(this.subtaskTitle);
  }

  deleteSubtask() {
    this.deleteEvent.emit(true);
  }
}
