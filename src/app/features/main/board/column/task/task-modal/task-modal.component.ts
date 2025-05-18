import { Component, inject, Inject } from '@angular/core';
import { Task } from '../../../../../../core/data/models/task.interface';
import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import { OpenTaskModalComponent } from './open-task-modal/open-task-modal.component';
import { EditTaskModalComponent } from './edit-task-modal/edit-task-modal.component';

@Component({
  selector: 'app-task-modal',
  imports: [OpenTaskModalComponent, EditTaskModalComponent],
  templateUrl: './task-modal.component.html',
  styleUrl: './task-modal.component.scss'
})
export class TaskModalComponent {
  constructor(@Inject(DIALOG_DATA) public data: Task) { }

  private dialogRef = inject(DialogRef);

  isBeingEdited = false;

  closeModal() {
    this.dialogRef?.close();
  }

  editTask() {
    this.isBeingEdited = true;
  }
}
