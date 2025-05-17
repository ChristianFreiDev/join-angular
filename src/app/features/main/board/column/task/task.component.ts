import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input() taskData: any;
  shortTaskDescription: string = '';

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
}
