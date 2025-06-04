import { Component, inject, Input } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { Task } from '../../../../core/data/models/task.interface';
import { CdkDrag, CdkDragDrop, CdkDragPreview, CdkDropList } from '@angular/cdk/drag-drop';
import { DropService } from '../services/drop.service';
import { DataService } from '../../../../core/data/data.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-column',
  imports: [TaskComponent, CdkDrag, CdkDropList, CommonModule, CdkDragPreview, RouterLink],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  dropService = inject(DropService);
  dataService = inject(DataService);
  @Input() status!: string;
  @Input() dropListId!: string;
  @Input() tasks: Task[] = [];
  rotate = false;

  drop(event: CdkDragDrop<Task[]>): void {
    this.dropService.drop(event);
    console.log(this.dataService.tasks());
  }
}
