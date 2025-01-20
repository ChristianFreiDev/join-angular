import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  firstNameInitial: string = 'A';
  lastNameInitial: string = 'B';

  logout() {
    console.log('logout');
  }

  showOrHideDropDownMenu() {
    console.log('show or hide dropdown');
  }
}
