import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
  host: {
    class: 'login-signup'
  }
})
export class LoginSignupComponent {

  hasIntroAnimationPlayed: boolean = false;

  constructor(private router: Router) {}

  get isLogin() {
    return this.router.url.includes('login');
  }

  get shouldPlayIntroAnimation() {
    return !this.hasIntroAnimationPlayed && this.isLogin;
  }
}
