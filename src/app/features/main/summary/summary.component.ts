import { Component, inject } from '@angular/core';
import { DataService } from '../../../core/data/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-summary',
  imports: [RouterLink],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {
  dataService = inject(DataService);
}
