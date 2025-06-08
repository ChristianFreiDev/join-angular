import { Component, computed, ElementRef, inject, signal, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { CheckboxComponent } from '../../../shared/checkbox/checkbox.component';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, CheckboxComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  host: {
    class: 'basic-card login-signup-card'
  }
})
export class SignupComponent {

  authService = inject(AuthService);
  router = inject(Router);

  formData = {
    name: '',
    email: '',
    password: '',
    passwordForConfirmation: '',
    checked: false
  }

  isFormDisabled: boolean = false;
  hasSignInFailed: boolean = false;

  @ViewChild('privacyPolicyCheckbox') privacyPolicyCheckbox!: ElementRef;
  @ViewChild('signupForm') signupForm!: HTMLFormElement;

  get isPasswordAMatch() {
    if (this.formData.passwordForConfirmation.length >= 8) {
      return this.formData.password === this.formData.passwordForConfirmation;
    } else {
      return true;
    }
  }

  get showCheckboxError() {
    if (this.signupForm) {
      return this.signupForm['submitted'] && !this.formData.checked;
    } else {
      return false;
    }
  }

  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid && this.isPasswordAMatch && !this.isFormDisabled && this.formData.checked) {
      this.isFormDisabled = true;
      try {
        await this.authService.createUser(this.formData.email, this.formData.password);
      } catch (error) {
        this.hasSignInFailed = true;
        this.isFormDisabled = false;
      }
    }
  }
}
