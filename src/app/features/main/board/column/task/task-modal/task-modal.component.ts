import { Component, inject, Inject } from '@angular/core';
import { Task } from '../../../../../../core/data/models/task.interface';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { OpenTaskModalComponent } from './open-task-modal/open-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task-modal',
  imports: [OpenTaskModalComponent, EditTaskModalComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss',
})
export class TaskModalComponent {
  clonedData!: Task;

  private dialogRef = inject(DialogRef);

  isBeingEdited = false;

  constructor(@Inject(DIALOG_DATA) public data: Task) {
    this.cloneData();
  }

  /**
   * This method clones the task data so that the data is only changed in the database when clicking "OK" to confirm after editing a task.
   * Only selecting or deselecting a subtask is immediate (desired behavior).
   */
  cloneData(): void {
    this.clonedData = { ...this.data };
    this.clonedData.assigneeIds = [...this.data.assigneeIds];
    this.clonedData.subtasks = [...this.data.subtasks];
  }

  /**
   * This method closes the modal.
   */
  closeModal(): void {
    this.dialogRef?.close();
  }

  /**
   * This method starts the editing process for a task.
   */
  editTask(): void {
    this.isBeingEdited = true;
  }
}
