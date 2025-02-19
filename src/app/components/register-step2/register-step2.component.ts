import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register-step2',
  imports: [
    FormsModule,
    HttpClientModule,
    NavbarComponent
  ],
  templateUrl: './register-step2.component.html',
  styleUrls: ['./register-step2.component.scss']
})
export class RegisterStep2Component {
  user = { weight: null, height: null, goal: '', level: '' };
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {}

  register(registerForm: any) {
    this.formSubmitted = true;

    if (registerForm.invalid) {
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    const finalUser = { ...storedUser, ...this.user };

    this.authService.register(finalUser).subscribe(() => {
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    });
  }
}
