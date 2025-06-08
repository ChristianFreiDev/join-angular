import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { DataService } from '../../core/data/data.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  dataService = inject(DataService);
  authService = inject(AuthService);

  firstNameInitial: string = 'A';
  lastNameInitial: string = 'B';
  isDropDownMenuOpen: boolean = false;

  logOut() {
    this.dataService.unsub();
    this.authService.logOut();
  }

  showOrHideDropDownMenu() {
    this.isDropDownMenuOpen = !this.isDropDownMenuOpen;
  }
}
