import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { AuthService } from '../../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CheckboxComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  host: {
    class: 'basic-card login-signup-card',
  },
})
export class LoginComponent {
  private authService = inject(AuthService);

  formData = {
    email: '',
    password: '',
    checked: false,
  };

  isError: boolean = false;
  isFormDisabled: boolean = false;

  /**
   * This method submits the form data or displays an error message if an error occurs.
   */
  async onSubmit(ngForm: NgForm): Promise<void> {
    this.isFormDisabled = true;
    if (ngForm.submitted && ngForm.valid) {
      try {
        await this.authService.signIn(
          this.formData.email,
          this.formData.password
        );
      } catch (error) {
        this.isError = true;
      }
    } else {
      this.isError = true;
      this.isFormDisabled = false;
    }
  }

  /**
   * This method sets the setting for remembering a user by calling the appropriate method in the task service.
   */
  rememberMe(shouldRemember: boolean): void {
    this.authService.rememberMe(shouldRemember);
  }
}
