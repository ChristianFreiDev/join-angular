import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TaskModalComponent } from './task-modal/task-modal.component';

@Component({
  selector: 'app-task',
  host: {
    "(click)": "openDialog($event)"
  },
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() taskData: any;
  shortTaskDescription: string = '';
  private dialog = inject(Dialog);

  createTaskDescriptionPreview(taskDescription: string) {
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

  ngOnInit() {
    this.shortTaskDescription = this.createTaskDescriptionPreview(this.taskData.description);
  }

  openDialog() {
    this.dialog.open(TaskModalComponent, {
      data: this.taskData,
    });
  }
}
