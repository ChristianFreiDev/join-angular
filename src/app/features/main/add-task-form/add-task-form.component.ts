import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input, ViewChild } from '@angular/core';
import { Task } from '../../../core/data/models/task.interface';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditableSubtaskComponent } from './editable-subtask/editable-subtask.component';
import { AssigneeOptionComponent } from './assignee-option/assignee-option.component';
import { Contact } from '../../../core/data/models/contact.interface';
import { DataService } from '../../../core/data/data.service';
import { getInitials } from '../../../core/utils/user-utils';
import { ClickOutsideDirective } from '../../../core/directives/click-outside.directive';

@Component({
  selector: 'app-add-task-form',
  imports: [
    CommonModule,
    FormsModule,
    EditableSubtaskComponent,
    AssigneeOptionComponent,
    ClickOutsideDirective
  ],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
})
export class AddTaskFormComponent {
  dataService = inject(DataService);
  router = inject(Router);

  emptyTask: Task = {
    title: '',
    description: '',
    id: '',
    assigneeIds: [],
    dueDate: '',
    priority: 'Medium',
    category: '',
    status: 'To do',
    subtasks: [],
  };

  @Input() taskData: Task = { ...this.emptyTask };
  @Input() isEditing: boolean = false;

  newSubtaskTitle: string = '';

  isShowingContacts: boolean = false;

  isError: boolean = false;

  @ViewChild('addTaskForm') ngForm?: NgForm;

  assignees = computed(() =>
    this.dataService
      .contacts()
      .filter((contact: Contact) =>
        this.taskData.assigneeIds.includes(contact.id)
      )
  );

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const status = params['status'];
      if (status) {
        this.taskData.status = status;
      }
    });
  }

  /**
   * This method changes the priority when a priority button is clicked.
   */
  clickPriorityButton(buttonName: 'Urgent' | 'Medium' | 'Low'): void {
    this.taskData.priority = buttonName;
  }

  getInitials = getInitials;

  /**
   * This method resets the form data.
   */
  resetForm(): void {
    this.taskData = { ...this.emptyTask };
    this.taskData.assigneeIds = [];
    this.taskData.subtasks = [];
  }

  /**
   * This method determines whether a contact is included in the list of assignees.
   */
  isAssigned(contact: Contact): boolean {
    return this.taskData.assigneeIds.includes(contact.id);
  }

  /**
   * This method adds a subtask with a random ID.
   */
  addSubtask(): void {
    if (this.newSubtaskTitle !== '') {
      this.taskData.subtasks.push({
        id: self.crypto.randomUUID(),
        title: this.newSubtaskTitle,
        done: false,
      });
      this.newSubtaskTitle = '';
    }
  }

  /**
   * This method deletes a subtask.
   */
  deleteSubtask(index: number): void {
    this.taskData.subtasks.splice(index, 1);
  }

  /**
   * This method sets the input value for filtering the contacts.
   */
  searchContacts(inputValue: string): void {
    this.dataService.contactFilterInputValue.set(inputValue);
  }

  /**
   * This method selects a contact by adding its ID to the list of assignee IDs.
   */
  selectContact(id: string): void {
    this.taskData.assigneeIds.push(id);
    this.dataService.refreshContacts();
  }

  /**
   * This method deselects a contact by removing its ID from the list of assignee IDs.
   */
  deselectContact(id: string): void {
    const index = this.taskData.assigneeIds.findIndex(
      (assigneeId) => assigneeId === id
    );
    if (index !== -1) {
      this.taskData.assigneeIds.splice(index, 1);
    }
    this.dataService.refreshContacts();
  }

  /**
   * This method submits the form by updating or adding a task depending on whether an existing task is being edited or not.
   */
  async submitForm(): Promise<string | void> {
    this.ngForm?.onSubmit(new Event('submit'));
    if (this.ngForm && this.ngForm.submitted && this.ngForm.valid) {
      try {
        if (this.isEditing) {
          return await this.dataService.updateTask(this.taskData, this.taskData.id);
        } else {
          return await this.dataService.addTask(this.taskData);
        }
      } catch (error) {
        this.isError = true;
        return Promise.reject('Form could not be submitted. Sending data failed.')
      }
    } else {
      this.isError = true;
      return Promise.reject('Form could not be submitted. Invalid data.')
    }
  }

  closeAssignees() {
    this.isShowingContacts = false;
  }
}
