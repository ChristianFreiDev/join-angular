import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-open-task-modal',
  imports: [],
  templateUrl: './open-task-modal.component.html',
  styleUrl: './open-task-modal.component.scss'
})
export class OpenTaskModalComponent {
  @Input() data!: Task;
  @Output() editTaskEvent = new EventEmitter<boolean>();

  private dialogRef = inject(DialogRef);

  deleteTask() {
    this.dialogRef?.close();
  }

  closeModal() {
    this.dialogRef?.close();
  }

  editTask() {
    this.editTaskEvent.emit(true);
  }
}
