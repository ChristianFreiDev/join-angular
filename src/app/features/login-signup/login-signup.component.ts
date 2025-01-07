import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-signup',
  imports: [LoginComponent, SignupComponent, RouterLink, CommonModule],
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
