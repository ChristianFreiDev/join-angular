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

  /**
   * This method resets the form by calling the appropriate method in the child component.
   */
  resetForm(): void {
    this.form.resetForm();
  }

  /**
   * This method submits the form by calling the appropriate method in the child component.
   */
  submitForm(): void {
    this.form.submitForm();
  }
}
