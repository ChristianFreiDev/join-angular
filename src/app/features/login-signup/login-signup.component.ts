import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-login-signup',
  imports: [LoginComponent],
  templateUrl: './login-signup.component.html',
  styleUrl: './login-signup.component.scss',
  host: {
    class: 'login-signup'
  }
})
export class LoginSignupComponent {

}
