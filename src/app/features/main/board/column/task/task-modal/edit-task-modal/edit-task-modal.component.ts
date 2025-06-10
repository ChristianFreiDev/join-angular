import { Component, inject, Input, ViewChild } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { DialogRef } from '@angular/cdk/dialog';
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

  private dialogRef = inject(DialogRef);

  /**
   * This method closes the modal.
   */
  closeModal(): void {
    this.dialogRef?.close();
  }

  /**
   * This method submits the form and closes the modal.
   */
  submitForm(): void {
    this.form.submitForm();
    this.closeModal();
  }
}
