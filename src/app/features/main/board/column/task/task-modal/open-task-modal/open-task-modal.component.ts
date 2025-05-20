import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { AssigneePreviewComponent } from './assignee-preview/assignee-preview.component';
import { offlineContacts } from '../../../../../../../core/data/dummy-data';
import { CommonModule } from '@angular/common';
import { SubtaskComponent } from './subtask/subtask.component';

@Component({
  selector: 'app-open-task-modal',
  imports: [AssigneePreviewComponent, SubtaskComponent, CommonModule],
  templateUrl: './open-task-modal.component.html',
  styleUrl: './open-task-modal.component.scss'
})
export class OpenTaskModalComponent {
  @Input() data!: Task;
  @Output() editTaskEvent = new EventEmitter<boolean>();
  assignees = offlineContacts.slice(0, 3);
  get priorityIcon() {
    if (this.data.priority === 'Medium') {
      return 'equal';
    } else {
      return 'double_arrow'
    }
  }

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
