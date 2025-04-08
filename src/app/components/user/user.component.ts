import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, FooterComponent],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    weight: null,
    height: null,
    goal: '',
    level: ''
  };
  formSubmitted: boolean = false;
  updateMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.getUserProfile().subscribe({
      next: (data: any) => {
        this.user = data;
      },
      error: (err: any) => console.error(err)
    });
  }

  updateUser(userForm: any): void {
    this.formSubmitted = true;
    if (userForm.invalid) {
      return;
    }
    this.authService.updateUser(this.user).subscribe({
      next: () => {
        this.updateMessage = 'Modifications enregistrées avec succès.';
      },
      error: (err: any) => {
        console.error(err);
        this.updateMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    });
  }
}
