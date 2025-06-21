import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { DataService } from '../../core/data/data.service';
import { ClickOutsideDirective } from '../../core/directives/click-outside.directive';
import { getInitials } from '../../core/utils/user-utils';

@Component({
  selector: 'app-header',
  imports: [RouterLink, ClickOutsideDirective],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  dataService = inject(DataService);
  authService = inject(AuthService);
  router = inject(Router);

  isUserLoggedIn = this.authService.isUserLoggedIn;

  initials = computed<string>(() => {
    const userName = this.authService.currentUserName();
    if (userName) {
      return getInitials(userName);
    } else {
      return 'G';
    }
  })
  
  isDropDownMenuOpen: boolean = false;

  /**
   * This method logs out the user.
   */
  logOut(): void {
    this.dataService.unsub();
    this.authService.logOut();
  }

  /**
   * This method navigates to a certain URL and closes the dropdown menu.
   */
  goToUrl(url: string) {
    this.router.navigateByUrl(url);
    this.isDropDownMenuOpen = false;
  }

  /**
   * This method toggles the dropdown menu.
   */
  showOrHideDropDownMenu(bool?: boolean): void {
    if (bool === undefined) {
      this.isDropDownMenuOpen = !this.isDropDownMenuOpen;
    } else if (bool !== this.isDropDownMenuOpen) {
      this.isDropDownMenuOpen = bool;
    }
  }
}
