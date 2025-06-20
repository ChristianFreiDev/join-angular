import { Component, inject, ViewChild } from '@angular/core';
import { AddTaskFormComponent } from "../add-task-form/add-task-form.component";
import { Router } from '@angular/router';
import { isFormDisabledManuallyOrInvalidUtil } from '../../../core/utils/form-utils';

@Component({
  selector: 'app-add-task',
  imports: [AddTaskFormComponent],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  private router = inject(Router);
  @ViewChild(AddTaskFormComponent) form!: AddTaskFormComponent;
  isFormDisabled: boolean = false;

  /**
   * This getter determines if the form is disabled manually or because it is invalid.
   */
  get isFormDisabledManuallyOrInvalid(): boolean {
    return isFormDisabledManuallyOrInvalidUtil(this.form, this.isFormDisabled);
  }

  /**
   * This method resets the form by calling the appropriate method in the child component.
   */
  resetForm(): void {
    this.form.resetForm();
  }

  /**
   * This method submits the form by calling the appropriate method in the child component.
   */
  async submitForm(): Promise<string | void> {
    this.isFormDisabled = true;
    try {
      await this.form.submitForm();
      this.router.navigateByUrl('main/board');
    } catch (error) {
      this.isFormDisabled = false;
    }
  }
}
