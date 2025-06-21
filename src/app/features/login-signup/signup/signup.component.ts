import {
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';
import { Dialog } from '@angular/cdk/dialog';
import { SignupMessageComponent } from '../signup-message/signup-message.component';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, CheckboxComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  host: {
    class: 'basic-card login-signup-card',
  },
})
export class SignupComponent {
  authService = inject(AuthService);
  router = inject(Router);
  dialog = inject(Dialog);

  formData = {
    name: '',
    email: '',
    password: '',
    passwordForConfirmation: '',
    checked: false,
  };

  isFormDisabled: boolean = false;
  hasSignInFailed: boolean = false;

  @ViewChild('privacyPolicyCheckbox') privacyPolicyCheckbox!: ElementRef;
  @ViewChild('signupForm') signupForm!: HTMLFormElement;

  /**
   * This getter determines whether the two entered passwords match.
   */
  get isPasswordAMatch() {
    if (this.formData.passwordForConfirmation.length >= 8) {
      return this.formData.password === this.formData.passwordForConfirmation;
    } else {
      return true;
    }
  }

  /**
   * This getter shows a checkbox error when necessary.
   */
  get showCheckboxError() {
    if (this.signupForm) {
      return this.signupForm['submitted'] && !this.formData.checked;
    } else {
      return false;
    }
  }

  /**
   * This method submits the form or displays an error message.
   */
  async onSubmit(ngForm: NgForm): Promise<void> {
    if (
      ngForm.submitted &&
      ngForm.valid &&
      this.isPasswordAMatch &&
      !this.isFormDisabled &&
      this.formData.checked
    ) {
      this.isFormDisabled = true;
      try {
        await this.authService.createUser(
          this.formData.name,
          this.formData.email,
          this.formData.password
        );
        this.dialog.open(SignupMessageComponent);
      } catch (error) {
        this.hasSignInFailed = true;
        this.isFormDisabled = false;
      }
    }
  }
}
