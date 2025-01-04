import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  host: {
    class: 'basic-card login-signup-card'
  }
})
export class SignupComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    passwordForConfirmation: ''
  }

  isError: boolean = false;

  isPasswordAMatch() {
    return this.formData.password === this.formData.passwordForConfirmation;
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid && this.isPasswordAMatch()) {
      console.log(this.formData);
    } else {
      console.log('passwords do not match');
    }
    this.isError = true;
  }
}
