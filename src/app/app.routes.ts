import {Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {RegisterStep1Component} from './components/register-step1/register-step1.component';
import {RegisterStep2Component} from './components/register-step2/register-step2.component';
import {LoginComponent} from './components/login/login.component';
import {ProgramSportifComponent} from './components/program-sportif/program-sportif.component';
import {DietProgramComponent} from './components/diet-program/diet-program.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterStep1Component},
  {path: 'register-step2', component: RegisterStep2Component},
  {path: 'programmes-sportifs', component: ProgramSportifComponent},
  {path: 'programmes-alimentaires', component: DietProgramComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];
