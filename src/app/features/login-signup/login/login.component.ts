import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { AuthService } from '../../../core/auth/auth.service';
import { environment } from '../../../../environments/environment';

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
  isGuestError: boolean = false;
  isFormDisabled: boolean = false;

  /**
   * This method submits the form data or displays an error message if an error occurs.
   */
  async onSubmit(ngForm: NgForm): Promise<void> {
    this.resetErrors();
    this.isFormDisabled = true;
    if (ngForm.submitted && ngForm.valid) {
      try {
        await this.authService.signIn(
          this.formData.email,
          this.formData.password
        );
      } catch (error) {
        this.isError = true;
        this.isFormDisabled = false;
      }
    } else {
      this.isError = true;
      this.isFormDisabled = false;
    }
  }

  /**
   * This method logs the user in as a guest.
   */
  async logInAsGuest(): Promise<void> {
    this.resetErrors();
    this.isFormDisabled = true;
    try {
        await this.authService.signIn(
          environment.guestUserCredentials.email,
          environment.guestUserCredentials.password
        );
      } catch (error) {
        this.isGuestError = true;
        this.isFormDisabled = false;
      }
  }

  /**
   * This method resets two possible errors.
   */
  resetErrors() {
    this.isError = false;
    this.isGuestError = false;
  }

  /**
   * This method sets the setting for remembering a user by calling the appropriate method in the task service.
   */
  rememberMe(shouldRemember: boolean): void {
    this.authService.rememberMe(shouldRemember);
  }
}
