import { Injectable, signal } from '@angular/core';
import { Task } from './models/task.interface';
import { offlineContacts, offlineTasks } from './dummy-data';
import { Contact } from './models/contact.interface';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  tasks = signal<Task[]>(offlineTasks);
  filteredTasks = signal<Task[]>(this.tasks());

  contacts = signal<Contact[]>(offlineContacts);
  filteredContacts = signal<Contact[]>(this.contacts());

  filterTasks(inputValue: string) {
    if (inputValue === '') {
      this.filteredTasks.set(this.tasks());
    } else {
      this.filteredTasks.set(
        this.tasks().filter(
          (task) =>
            task.title.toLowerCase().includes(inputValue.toLowerCase()) ||
            task.description.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }

  filterContacts(inputValue: string) {
    if (inputValue === '') {
      this.filteredContacts.set(this.contacts());
    } else {
      this.filteredContacts.set(
        this.contacts().filter((contact) =>
          contact.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }

  updateTaskStatus(id: string, status: string) {
    this.tasks.update((values) => {
      values.forEach((val) => {
        if (val.id === id) {
          val.status = status;
        }
      });
      return [...values];
    });
  }

  getAssignees(assigneeIDs: string[]) {
    return this.contacts().filter((item: Contact) =>
      assigneeIDs.includes(item.id)
    );
  }
}
