import { Component, inject, Signal } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";
import { ColumnComponent } from './column/column.component';
import { DataService } from '../../../core/data/data.service';
import { Task } from '../../../core/data/models/task.interface';

@Component({
  selector: 'app-board',
  imports: [SearchBarComponent, ColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {
  dataService = inject(DataService);
  tasks: Signal<Task[]> = this.dataService.filteredTasks;
}
