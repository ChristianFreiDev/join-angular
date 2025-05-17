import { Component, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from '../../../../core/data/models/task.interface';

@Component({
  selector: 'app-column',
  imports: [TaskComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  @Input() status!: string;
  @Input() tasks: Task[] = [];

  tasksWithStatus() {
    return this.tasks.filter((task: Task) => task.status === this.status).length > 0;
  }
}
