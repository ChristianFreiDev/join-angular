import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-reset',
  imports: [],
  templateUrl: './reset.component.html',
  styleUrl: './reset.component.scss'
})
export class ResetComponent {
  private dataService = inject(DataService);
  constructor() {
    this.dataService.addDummyData();
  }
}
