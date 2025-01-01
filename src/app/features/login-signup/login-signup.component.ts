import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  imports: [LoginComponent, SignupComponent],
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
