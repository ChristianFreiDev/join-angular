import { Routes } from '@angular/router';
import { LoginSignupComponent } from './features/login-signup/login-signup.component';
import { LoginComponent } from './features/login-signup/login/login.component';
import { SignupComponent } from './features/login-signup/signup/signup.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginSignupComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
    ],
  },
  { path: 'privacy-policy', redirectTo: 'login', pathMatch: 'full' },
  { path: 'legal-notice', redirectTo: 'signup', pathMatch: 'full' }
];
