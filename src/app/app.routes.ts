import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterStep1Component} from './components/register-step1/register-step1.component';
import {RegisterStep2Component} from './components/register-step2/register-step2.component';
import {LoginComponent} from './components/login/login.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterStep1Component},
  {path: 'register-step2', component: RegisterStep2Component},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
