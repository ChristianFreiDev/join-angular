import { Component, computed, inject, Signal } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { RouterLink } from '@angular/router';
import { Task } from '../../../core/data/models/task.interface';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-summary',
  imports: [RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss',
})
export class SummaryComponent {
  dataService = inject(DataService);
  authService = inject(AuthService);

  userName: Signal<string | undefined> = this.authService.currentUserName;
  hasGreetingAnimationPlayed: Signal<boolean> = this.authService.hasGreetingAnimationPlayed;

  numberOfTasksTodo: Signal<number> = computed(() =>
    this.getNumberOfTasksWithStatus('To do')
  );

  numberOfTasksAwaitingFeedback: Signal<number> = computed(() =>
    this.getNumberOfTasksWithStatus('Await feedback')
  );

  numberOfTasksInProgress: Signal<number> = computed(() =>
    this.getNumberOfTasksWithStatus('In progress')
  );

  numberOfTasksDone: Signal<number> = computed(() =>
    this.getNumberOfTasksWithStatus('Done')
  );

  numberOfUrgentTasks: Signal<number> = computed(
    () =>
      this.dataService.tasks().filter((task) => task.priority === 'Urgent')
        .length
  );

  upcomingDeadline: Signal<boolean> = computed(
    () => this.getTasksNotDoneWithDeadlinesInTheFuture().length > 0
  );

  closestDeadline: Signal<string> = computed(() => {
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

  constructor() {
    this.dataService.initSubscriptionsIfNecessary();
  }

  /**
   * This getter returns the appropriate greeting depending on the current time.
   */
  get greeting() {
    const time = new Date().getHours();
    if (time < 12) {
      return 'Good Morning';
    } else if (time < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  }

  /**
   * This method stores the information that the greeting animation has been played.
   */
  onAnimationEnd() {
    this.authService.hasGreetingAnimationPlayed.set(true);
  }

  /**
   * This method returns the tasks that are not done yet and have a deadline in the future.
   */
  getTasksNotDoneWithDeadlinesInTheFuture(): Task[] {
    return this.dataService
      .tasks()
      .filter(
        (task) => task.status !== 'Done' && new Date() < new Date(task.dueDate)
      );
  }

  /**
   * This method returns the number of tasks with a certain status.
   */
  getNumberOfTasksWithStatus(status: string): number {
    return this.dataService.tasks().filter((task) => task.status === status)
      .length;
  }
}
