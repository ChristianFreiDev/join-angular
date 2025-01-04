import { Component, computed, ElementRef, signal, Signal, ViewChild } from '@angular/core';
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
    email: '',
    password: ''
  }

  isError: boolean = false;

  @ViewChild('loginCheckbox') loginCheckbox!: ElementRef;

  isCheckboxChecked = signal<boolean>(false);

  checkboxName = computed(() => this.isCheckboxChecked() ? 'select_check_box' : 'check_box_outline_blank');

  clickCheckbox() {
    this.loginCheckbox.nativeElement.checked = !this.loginCheckbox.nativeElement.checked;
    this.isCheckboxChecked.set(!this.isCheckboxChecked());
  }

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid) {
      console.log(this.formData);
      this.isError = true;
    }
  }
}
