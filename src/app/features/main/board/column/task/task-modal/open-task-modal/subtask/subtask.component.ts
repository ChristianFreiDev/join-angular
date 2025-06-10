import { Component, inject, Input } from '@angular/core';
import { CheckboxComponent } from '../../../../../../../../shared/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../../../../../../core/data/data.service';

@Component({
  selector: 'app-subtask',
  imports: [CheckboxComponent, FormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent {
  @Input() subtask!: any;
  @Input() taskId!: string;
  dataService = inject(DataService);

  selectOrDeselectSubtask() {
    this.dataService.selectOrDeselectSubtask(this.taskId, this.subtask.id)
  }
}

