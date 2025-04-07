import {Component} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    HttpClientModule,
    NavbarComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  credentials = {email: '', password: ''};
  formSubmitted = false;

  constructor(private authService: AuthService, private router: Router) {
  }

  login(loginForm: any) {
    this.formSubmitted = true;
    if (loginForm.invalid) {
      return;
    }
    this.authService.login(this.credentials).subscribe(
      (response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      (error) => {
        console.error("Erreur lors de la connexion", error);
      }
    );
  }
}
