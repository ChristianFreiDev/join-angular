import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/data/data.service';

@Component({
  selector: 'app-summary',
  imports: [],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  dataService = inject(DataService);
}
