import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
  host: {
    class: 'login-signup',
  },
})
export class LoginSignupComponent {
  hasIntroAnimationPlayed: boolean = false;

  constructor(private router: Router) {}

  /**
   * This getter determines whether the current route is the login route.
   */
  get isLogin() {
    return this.router.url.includes('login');
  }

  /**
   * This getter determines whether the intro animation should be played.
   * This is the case when the animation has not been played yet and
   * the current route is the login route.
   */
  get shouldPlayIntroAnimation() {
    return !this.hasIntroAnimationPlayed && this.isLogin;
  }

    /**
   * This method removes the overlay from the DOM after the animation has ended.
   */
  onIntroAnimationEnd(el: HTMLDivElement) {
    this.hasIntroAnimationPlayed = true;
    el.style.display = 'none';
  }
}
