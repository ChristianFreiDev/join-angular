import { Component, computed, inject, Signal } from '@angular/core';
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
  tasks: Signal<Task[]> = this.dataService.filteredTasks;
  tasksTodo =  computed(() => this.tasks().filter(task => task.status === 'To do'));
  tasksInProgress = computed(() => this.tasks().filter(task => task.status === 'In progress'));
  tasksAwaitingFeedback = computed(() => this.tasks().filter(task => task.status === 'Await feedback'));
  tasksDone = computed(() => this.tasks().filter(task => task.status === 'Done'));

  ngOnInit() {
    this.dataService.filterTasks('');
  }
}
