import { Component, computed, ElementRef, signal, ViewChild } from '@angular/core';
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

  @ViewChild('privacyPolicyCheckbox') privacyPolicyCheckbox!: ElementRef;

  isCheckboxChecked = signal<boolean>(false);

  checkboxSymbolName = computed(() => this.isCheckboxChecked() ? 'select_check_box' : 'check_box_outline_blank');
  
  clickCheckbox() {
    this.privacyPolicyCheckbox.nativeElement.checked = !this.privacyPolicyCheckbox.nativeElement.checked;
    this.isCheckboxChecked.set(!this.isCheckboxChecked());
  }

  get isPasswordAMatch() {
    if (this.formData.password.length === this.formData.passwordForConfirmation.length) {
      return this.formData.password === this.formData.passwordForConfirmation;
    } else {
      return true;
    }
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid && this.isPasswordAMatch) {
      console.log(this.formData);
    }
  }
}
