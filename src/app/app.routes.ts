import { Routes } from '@angular/router';
import { LoginSignupComponent } from './features/login-signup/login-signup.component';
import { LoginComponent } from './features/login-signup/login/login.component';
import { SignupComponent } from './features/login-signup/signup/signup.component';
import { MainComponent } from './features/main/main.component';
import { SummaryComponent } from './features/main/summary/summary.component';
import { AddTaskComponent } from './features/main/add-task/add-task.component';
import { BoardComponent } from './features/main/board/board.component';
import { ContactsComponent } from './features/main/contacts/contacts.component';
import { PrivacyPolicyComponent } from './features/main/privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './features/main/legal-notice/legal-notice.component';
import { HelpComponent } from './features/main/help/help.component';

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
  {
    path: 'main',
    component: MainComponent,
    children: [
      { path: 'summary', component: SummaryComponent },
      { path: 'add-task', component: AddTaskComponent },
      { path: 'board', component: BoardComponent },
      { path: 'contacts', component: ContactsComponent },
      { path: 'privacy-policy', component: PrivacyPolicyComponent },
      { path: 'legal-notice', component: LegalNoticeComponent },
      { path: 'help', component: HelpComponent }
    ],
  }
];
