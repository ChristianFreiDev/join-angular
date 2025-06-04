import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { inject, Injectable } from '@angular/core';
import { Task } from '../../../../core/data/models/task.interface';
import { DataService } from '../../../../core/data/data.service';

@Injectable({
  providedIn: 'root'
})
export class DropService {
  dataService = inject(DataService);

  drop(event: CdkDragDrop<Task[]>): void {
    let containerIdText = event.container.id;
    let containerId = +containerIdText.substring(containerIdText.length - 1);
    let statuses = ['To do', 'In progress', 'Await feedback', 'Done'];
    let currentTaskId = event.previousContainer.data[event.previousIndex].id;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.dataService.updateTaskStatus(currentTaskId, statuses[containerId]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
