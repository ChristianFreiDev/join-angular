import { Component, inject, Input } from '@angular/core';
import { DataService } from '../../../../../../core/data/data.service';

@Component({
  selector: 'app-move-task-menu',
  imports: [],
  templateUrl: './move-task-menu.component.html',
  styleUrl: './move-task-menu.component.scss'
})
export class MoveTaskMenuComponent {
  @Input() taskData!: any;
  statuses: string[] = ['To do', 'Await feedback', 'In progress', 'Done'];
  dataService = inject(DataService);

  ngOnInit() {
    this.statuses = this.statuses.filter((el) => el !== this.taskData.status);
  }

  moveTask(status: string): void {
    this.taskData.status = status;
    this.dataService.updateTask(this.taskData, this.taskData.id);
  }
}
