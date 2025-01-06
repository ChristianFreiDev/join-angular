import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [LoginComponent, SignupComponent, RouterLink],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
  host: {
    class: 'login-signup'
  }
})
export class LoginSignupComponent {
  constructor(private router: Router) {}

  isLogin() {
    return this.router.url.includes('login');
  }
}
