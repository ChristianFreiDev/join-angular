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

  ngOnInit(): void {
    this.assignees = this.dataService.getAssignees(this.data.assigneeIds);
  }

  /**
   * This method deletes a task.
   */
  async deleteTask(): Promise<void> {
    try {
      await this.dataService.deleteTask(this.data.id);
      this.dialogRef?.close();
    } catch (error) {
      console.error(error);
    }
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
    this.editTaskEvent.emit(true);
  }
}
