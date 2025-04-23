import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-task-form',
  imports: [CommonModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  urgency: 'urgent' | 'medium' | 'low' = 'medium';
  
  clickPriorityButton(buttonName: 'urgent' | 'medium' | 'low') {
    this.urgency = buttonName;
  }
}
