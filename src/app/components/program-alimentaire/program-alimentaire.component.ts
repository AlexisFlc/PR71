import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { AuthService } from '../../services/auth.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-program-alimentaire',
  templateUrl: './program-alimentaire.component.html',
  imports: [
    NavbarComponent,
    NgForOf
  ],
  styleUrls: ['./program-alimentaire.component.scss']
})
export class ProgramAlimentaireComponent implements OnInit {
  programs: any[] = [];
  user: any = null;

  constructor(private programService: ProgramService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.fetchPrograms();
  }

  fetchPrograms(): void {
    if (this.user) {
      this.programService.getFoodPrograms(this.user.level, this.user.goal).subscribe(data => {
        this.programs = data;
      });
    }
  }
}
