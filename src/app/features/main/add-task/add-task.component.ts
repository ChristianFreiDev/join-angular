import { Component, ViewChild } from '@angular/core';
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";

@Component({
  selector: 'app-add-task',
  imports: [AddTaskFormComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  @ViewChild(AddTaskFormComponent) form!: AddTaskFormComponent;
  resetForm() {
    this.form.resetForm();
  }
}
