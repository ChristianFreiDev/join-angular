import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';
import { Subtask } from '../../../../../core/data/models/subtask.interface';
import { DataService } from '../../../../../core/data/data.service';
import { getInitials } from '../../../../../core/utils/user-utils';
import { MoveTaskMenuComponent } from './move-task-menu/move-task-menu.component';
import { ClickOutsideDirective } from '../../../../../core/directives/click-outside.directive';

@Component({
  selector: 'app-task',
  host: {
    '(click)': 'openDialog($event)',
  },
  imports: [CommonModule, MoveTaskMenuComponent, ClickOutsideDirective],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
})
export class TaskComponent {
  @Input() taskData: any;
  @Input() isRotated: boolean = false;
  isMoveTaskMenuOpen: boolean = false;
  assignees!: { color: string; initials: string }[];
  shortTaskDescription: string = '';
  amountOfSubtasks: number = 0;
  amountOfDoneSubtasks: number = 0;
  progressValue: number = 0;
  private dialog = inject(Dialog);
  dataService = inject(DataService);

  get priorityIcon() {
    if (this.taskData.priority === 'Medium') {
      return 'equal';
    } else {
      return 'double_arrow';
    }
  }

  ngOnChanges(): void {
    this.assignees = this.dataService
      .getAssignees(this.taskData.assigneeIds)
      .map((assignee) => {
        return { color: assignee.color, initials: getInitials(assignee.name) };
      });
    this.shortTaskDescription = this.createTaskDescriptionPreview(
      this.taskData.description
    );
    this.amountOfSubtasks = this.taskData.subtasks.length;
    this.amountOfDoneSubtasks = this.taskData.subtasks.filter(
      (subtask: Subtask) => subtask.done === true
    ).length;
    this.progressValue =
      (this.amountOfDoneSubtasks / this.taskData.subtasks.length) * 100;
  }

  /**
   * This method creates a short preview of the task description.
   */
  createTaskDescriptionPreview(taskDescription: string): string {
    let result = '';
    for (let i = 0; i < taskDescription.length; i++) {
      let character = taskDescription[i];
      if ((character === ' ' && i > 35) || i > 55) {
        if (taskDescription.length > i) {
          return result + '...';
        } else {
          return result;
        }
      } else {
        result += character;
      }
    }
    return result;
  }

  /**
   * This method opens a dialog.
   */
  openDialog(): void {
    this.dialog.open(TaskModalComponent, {
      data: this.taskData,
    });
  }

  /**
   * This method opens the menu for moving tasks.
   */
  openOrCloseMoveTaskMenu(bool: boolean): void {
    this.isMoveTaskMenuOpen = bool;
  }
}
