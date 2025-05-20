import { Component, Input } from '@angular/core';
import { CheckboxComponent } from '../../../../../../../../shared/checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subtask',
  imports: [CheckboxComponent, FormsModule],
  templateUrl: './subtask.component.html',
  styleUrl: './subtask.component.scss'
})
export class SubtaskComponent {
  @Input() subtask!: any;

  selectOrDeselectSubtask() {
    this.subtask.done = !this.subtask.done;
  }
}

