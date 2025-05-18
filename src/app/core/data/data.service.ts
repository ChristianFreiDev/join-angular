import { computed, Injectable, signal } from '@angular/core';
import { Task } from './models/task.interface';
import { offlineTasks } from './dummy-data';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  tasks = signal<Task[]>(offlineTasks);
  filteredTasks = signal<Task[]>(this.tasks());

  numberOfTasksTodo = computed(() => this.getNumberOfTasksWithStatus('To do'));
  numberOfTasksAwaitingFeedback = computed(() =>
    this.getNumberOfTasksWithStatus('Await feedback')
  );
  numberOfTasksInProgress = computed(() =>
    this.getNumberOfTasksWithStatus('In progress')
  );
  numberOfTasksDone = computed(() => this.getNumberOfTasksWithStatus('Done'));
  numberOfUrgentTasks = computed(
    () => this.tasks().filter((task) => task.priority === 'Urgent').length
  );

  upcomingDeadline = computed(
    () => this.getTasksNotDoneWithDeadlinesInTheFuture().length > 0
  );

  closestDeadline = computed(() => {
    let filteredTasks = this.getTasksNotDoneWithDeadlinesInTheFuture();
    if (filteredTasks.length > 0) {
      let dueDate = filteredTasks.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      )[0].dueDate;
      return new Date(dueDate).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else {
      return '';
    }
  });

  getNumberOfTasksWithStatus(status: string) {
    return this.tasks().filter((task) => task.status === status).length;
  }

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
    if (status === undefined || id === undefined) {
      console.log('error', status, id);
      return;
    } else {
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

  getTasksNotDoneWithDeadlinesInTheFuture() {
    return this.tasks().filter(
      (task) => task.status !== 'Done' && new Date() < new Date(task.dueDate)
    );
  }
}
