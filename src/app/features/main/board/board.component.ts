import { Component } from '@angular/core';
import { SearchBarComponent } from "./search-bar/search-bar.component";

@Component({
  selector: 'app-board',
  imports: [SearchBarComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

}
