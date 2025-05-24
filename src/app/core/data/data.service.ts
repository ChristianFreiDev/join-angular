import { computed, Injectable, signal } from '@angular/core';
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

  filterTasks(inputString: string) {
    if (inputString === '') {
      this.filteredTasks.set(this.tasks());
    } else {
      this.filteredTasks.set(
        this.tasks().filter(
          (task) =>
            task.title.toLowerCase().includes(inputString.toLowerCase()) ||
            task.description.toLowerCase().includes(inputString.toLowerCase())
        )
      );
    }
  }

  updateTaskStatus(id: number, status: string) {
    this.tasks.update((values) => {
      values.forEach((val) => {
        if (val.id === id) {
          val.status = status;
        }
      });
      return [...values];
    });
  }
}
