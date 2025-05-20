import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CheckboxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'basic-card login-signup-card'
  }
})
export class LoginComponent {

  formData = {
    email: '',
    password: '',
    checked: false
  }

  isError: boolean = false;

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid) {
      console.log(this.formData);
      ngForm.resetForm();
    } else {
      this.isError = true;
    }
  }
}
