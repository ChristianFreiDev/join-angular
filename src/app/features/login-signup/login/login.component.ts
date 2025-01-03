import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'basic-card login-signup-card'
  }
})
export class LoginComponent {
  formData = {
    name: '',
    password: ''
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid) {
      console.log(this.formData);
    }
  }
}
