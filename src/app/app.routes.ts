import { Routes } from '@angular/router';
import { LoginSignupComponent } from './features/login-signup/login-signup.component';

export const routes: Routes = [
    { path: '', component: LoginSignupComponent },
    { path: 'login', component: LoginSignupComponent },
    { path: 'signup', component: LoginSignupComponent },
    { path: 'privacy-policy', component: LoginSignupComponent }
];
