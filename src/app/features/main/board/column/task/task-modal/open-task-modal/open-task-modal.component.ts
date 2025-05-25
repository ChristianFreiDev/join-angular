import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Task } from '../../../../../../../core/data/models/task.interface';
import { DialogRef } from '@angular/cdk/dialog';
import { AssigneePreviewComponent } from './assignee-preview/assignee-preview.component';
import { CommonModule } from '@angular/common';
import { SubtaskComponent } from './subtask/subtask.component';
import { DataService } from '../../../../../../../core/data/data.service';
import { Contact } from '../../../../../../../core/data/models/contact.interface';

@Component({
  selector: 'app-open-task-modal',
  imports: [AssigneePreviewComponent, SubtaskComponent, CommonModule],
  templateUrl: './open-task-modal.component.html',
  styleUrl: './open-task-modal.component.scss'
})
export class OpenTaskModalComponent {
  private dataService = inject(DataService);
  @Input() data!: Task;
  @Output() editTaskEvent = new EventEmitter<boolean>();
  assignees: Contact[] = [];
  get priorityIcon() {
    if (this.data.priority === 'Medium') {
      return 'equal';
    } else {
      return 'double_arrow'
    }
  }

  private dialogRef = inject(DialogRef);

  ngOnInit() {
    this.assignees = this.dataService.getAssignees(this.data.assigneeIds);
  }

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
