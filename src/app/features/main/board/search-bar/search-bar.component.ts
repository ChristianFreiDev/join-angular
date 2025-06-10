import { Component, inject } from '@angular/core';
import { DataService } from '../../../../core/data/data.service';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {
  dataService = inject(DataService);

  /**
   * This method filters the tasks based on some input value.
   */
  filterTasks(inputString: string): void {
    this.dataService.taskFilterInputValue.set(inputString);
  }
}
