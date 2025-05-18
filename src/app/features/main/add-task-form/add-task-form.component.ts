import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Task } from '../../../core/data/models/task.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-task-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  constructor(private route: ActivatedRoute) {}

  @Input() taskData: Task = {
        title: '',
        description: '',
        id: -1,
        collaborators: [],
        dueDate: '',
        priority: 'Medium',
        category: '',
        status: 'To do',
        subtasks: []
  }
  
  clickPriorityButton(buttonName: 'Urgent' | 'Medium' | 'Low') {
    this.taskData.priority = buttonName;
    console.log(this.taskData);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.taskData.status = params['status'];
      })
  }
}
