import { Component, OnInit } from '@angular/core';
import { ProgramService } from '../../services/program.service';
import { AuthService } from '../../services/auth.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-program-sportif',
  templateUrl: './program-sportif.component.html',
  imports: [
    NavbarComponent,
    NgForOf
  ],
  styleUrls: ['./program-sportif.component.scss']
})
export class ProgramSportifComponent implements OnInit {
  programs: any[] = [];
  user: any = null;

  constructor(private programService: ProgramService, private authService: AuthService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.fetchPrograms();
  }

  fetchPrograms(): void {
    if (this.user) {
      this.programService.getSportPrograms(this.user.level, this.user.goal).subscribe(data => {
        this.programs = data;
      });
    }
  }
}
