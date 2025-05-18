import { Component, inject, Input } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { AddTaskFormComponent } from '../../../../../add-task-form/add-task-form.component';

@Component({
  selector: 'app-edit-task-modal',
  imports: [AddTaskFormComponent],
  templateUrl: './edit-task-modal.component.html',
  styleUrl: './edit-task-modal.component.scss'
})
export class EditTaskModalComponent {
  @Input() data!: Task;

  private dialogRef = inject(DialogRef);

  closeModal() {
    this.dialogRef?.close();
  }
}
