import { CommonModule } from '@angular/common';
import { Component, computed, inject, Input } from '@angular/core';
import { Task } from '../../../core/data/models/task.interface';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EditableSubtaskComponent } from './editable-subtask/editable-subtask.component';
import { AssigneeOptionComponent } from './assignee-option/assignee-option.component';
import { Contact } from '../../../core/data/models/contact.interface';
import { DataService } from '../../../core/data/data.service';
import { getInitials } from '../../../core/utils/user-utils';

@Component({
  selector: 'app-add-task-form',
  imports: [CommonModule, FormsModule, EditableSubtaskComponent, AssigneeOptionComponent],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss'
})
export class AddTaskFormComponent {
  dataService = inject(DataService);
  constructor(private route: ActivatedRoute) {}

  emptyTask: Task = {
        title: '',
        description: '',
        id: '',
        assigneeIds: [],
        dueDate: '',
        priority: 'Medium',
        category: '',
        status: 'To do',
        subtasks: []
  };

  @Input() taskData: Task = { ...this.emptyTask };
  @Input() isEditing: boolean = false;

  newSubtaskTitle: string = '';

  isShowingContacts: boolean = false;

  assignees = computed(() => this.dataService.contacts().filter((contact: Contact) => this.taskData.assigneeIds.includes(contact.id)));
  
  clickPriorityButton(buttonName: 'Urgent' | 'Medium' | 'Low') {
    this.taskData.priority = buttonName;
    console.log(this.taskData);
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        const status = params['status'];
        if (status) {
          this.taskData.status = status;
        }
      });
  }

  getInitials = getInitials;

  resetForm() {
    this.taskData = { ...this.emptyTask };
  }

  isAssigned(contact: Contact) {
    return this.taskData.assigneeIds.includes(contact.id);
  }

  addSubtask() {
   if (this.newSubtaskTitle !== '') {
     this.taskData.subtasks.push({
      id: self.crypto.randomUUID(),
      title: this.newSubtaskTitle,
      done: false
    });
    this.newSubtaskTitle = '';
   }
  }

  deleteSubtask(index: number) {
    this.taskData.subtasks.splice(index, 1);
  }

  searchContacts(inputValue: string) {
    this.dataService.filterContacts(inputValue);
  }

  selectContact(id: string) {
    this.taskData.assigneeIds.push(id);
  }

  deselectContact(id: string) {
    const index = this.taskData.assigneeIds.findIndex(assigneeId => assigneeId === id);
    if (index !== -1) {
      this.taskData.assigneeIds.splice(index, 1);
    }
  }

  submitForm() {
    console.log(this.taskData);
    if (this.isEditing) {
      this.dataService.updateTask(this.taskData, this.taskData.id);
    } else {
      this.dataService.addTask(this.taskData);
    }
  }
}
