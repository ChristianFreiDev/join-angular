import { Component, computed, inject, signal, Signal } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { DataService } from '../../../core/data/data.service';
import { CdkDropListGroup  } from '@angular/cdk/drag-drop';
import { ColumnComponent } from './column/column.component';
import { Task } from '../../../core/data/models/task.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board',
  imports: [SearchBarComponent, CdkDropListGroup, ColumnComponent, RouterLink],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  private dataService = inject(DataService);
  filteredTasks = signal<Task[]>(this.dataService.tasks());
  tasksTodo =  computed(() => this.filteredTasks().filter(task => task.status === 'To do'));
  tasksInProgress = computed(() => this.filteredTasks().filter(task => task.status === 'In progress'));
  tasksAwaitingFeedback = computed(() => this.filteredTasks().filter(task => task.status === 'Await feedback'));
  tasksDone = computed(() => this.filteredTasks().filter(task => task.status === 'Done'));

  ngOnInit() {
    this.filterTasks('');
  }

    filterTasks(inputString: string) {
    if (inputString === '') {
      this.filteredTasks.set(this.dataService.tasks());
    } else {
      this.filteredTasks.set(
        this.dataService.tasks().filter(
          (task) =>
            task.title.toLowerCase().includes(inputString.toLowerCase()) ||
            task.description.toLowerCase().includes(inputString.toLowerCase())
        )
      );
    }
  }

}
