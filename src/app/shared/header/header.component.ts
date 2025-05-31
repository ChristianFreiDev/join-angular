import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  firstNameInitial: string = 'A';
  lastNameInitial: string = 'B';
  isDropDownMenuOpen: boolean = false;

  logout() {
    console.log('logout');
  }

  showOrHideDropDownMenu() {
    this.isDropDownMenuOpen = !this.isDropDownMenuOpen;
  }
}
