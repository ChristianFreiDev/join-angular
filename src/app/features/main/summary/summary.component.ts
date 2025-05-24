import { Component, computed, inject } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  dataService = inject(DataService);

  numberOfTasksTodo = computed(() => this.getNumberOfTasksWithStatus('To do'));
  numberOfTasksAwaitingFeedback = computed(() =>
    this.getNumberOfTasksWithStatus('Await feedback')
  );
  numberOfTasksInProgress = computed(() =>
    this.getNumberOfTasksWithStatus('In progress')
  );
  numberOfTasksDone = computed(() => this.getNumberOfTasksWithStatus('Done'));
  numberOfUrgentTasks = computed(
    () =>
      this.dataService.tasks().filter((task) => task.priority === 'Urgent')
        .length
  );

  getTasksNotDoneWithDeadlinesInTheFuture() {
    return this.dataService
      .tasks()
      .filter(
        (task) => task.status !== 'Done' && new Date() < new Date(task.dueDate)
      );
  }

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
    return this.dataService.tasks().filter((task) => task.status === status)
      .length;
  }
}
