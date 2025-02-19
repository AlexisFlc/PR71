import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-register-step1',
  imports: [
    FormsModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './register-step1.component.html',
  styleUrls: ['./register-step1.component.scss']
})
export class RegisterStep1Component {
  user = { firstName: '', lastName: '', email: '', password: '' };
  formSubmitted = false;

  constructor(private router: Router) {}

  nextStep(registerForm: any) {
    this.formSubmitted = true;

    if (registerForm.invalid) {
      return;
    }

    localStorage.setItem('user', JSON.stringify(this.user));
    this.router.navigate(['/register-step2']);
  }
}
