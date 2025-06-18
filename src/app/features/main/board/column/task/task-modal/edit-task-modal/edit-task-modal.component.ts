import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { AddTaskFormComponent } from '../../../../../add-task-form/add-task-form.component';

@Component({
  selector: 'app-edit-task-modal',
  imports: [AddTaskFormComponent],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss',
})
export class EditTaskModalComponent {
  @Input() data!: Task;
  @ViewChild(AddTaskFormComponent) form!: AddTaskFormComponent;
  @Output() closeDialogEvent = new EventEmitter<void>();

  isFormDisabled: boolean = false;

  /**
   * This method closes the modal.
   */
  closeModal(): void {
    this.closeDialogEvent.emit();
  }

  /**
   * This method submits the form by calling the appropriate method in the child component.
   */
  async submitForm(): Promise<string | void> {
    this.isFormDisabled = true;
    try {
      await this.form.submitForm();
      this.closeModal();
    } catch (error) {
      this.isFormDisabled = false;
    }
  }
}
