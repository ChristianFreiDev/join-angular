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
    class: 'basic-card login-signup-card'
  }
})
export class LoginComponent {

  // private environmentInjector = inject(EnvironmentInjector);
  private authService = inject(AuthService);

  formData = {
    email: '',
    password: '',
    checked: false
  }

  isError: boolean = false;

  async onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.valid) {
      try {
        // runInInjectionContext(this.environmentInjector, async () => {
        //   const authService = inject(AuthService);
        //   await authService.signIn(this.formData.email, this.formData.password);
        // })
        await this.authService.signIn(this.formData.email, this.formData.password);
      } catch (error) {
        this.isError = true;
      }
    } else {
      this.isError = true;
    }
  }

  rememberMe(shouldRemember: boolean) {
    this.authService.rememberMe(shouldRemember);
  }
}
