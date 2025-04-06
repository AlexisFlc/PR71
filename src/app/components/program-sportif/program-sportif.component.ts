import {Component, OnInit} from '@angular/core';
import {ProgramService} from '../../services/program.service';
import {SportProgram, ArticleComment} from '../../models/program.model';
import {CommonModule, NgClass, NgStyle} from '@angular/common';
import {NavbarComponent} from '../navbar/navbar.component';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-program-sportif',
  templateUrl: './program-sportif.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NgStyle,
    NgClass,
    NavbarComponent,
    FooterComponent
  ],
  styleUrls: ['./program-sportif.component.scss']
})
export class ProgramSportifComponent implements OnInit {
  programs: SportProgram[] = [];

  constructor(private programService: ProgramService) {
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.programService.getPrograms().subscribe({
      next: (data: SportProgram[]) => {
        console.log(data);
        this.programs = data;
      },
      error: (err: any) => console.error(err)
    });
  }

  toggleFavorite(program: SportProgram): void {
    program.isFavorite = !program.isFavorite;
    this.programService.toggleFavorite(program.id, program.isFavorite)
      .subscribe({
        next: () => console.log('Favori mis à jour'),
        error: (err: any) => console.error(err)
      });
  }

  addRating(program: SportProgram, rating: number): void {
    this.programService.addRating(program.id, rating)
      .subscribe({
        next: (res: { rating: number; numberOfRatings: number }) => {
          program.rating = res.rating;
          program.numberOfRatings = res.numberOfRatings;
        },
        error: (err: any) => console.error(err)
      });
  }

  addComment(program: SportProgram, commentText: string, user = 'Anonymous'): void {
    if (!commentText) {
      return;
    }
    this.programService.addComment(program.id, user, commentText)
      .subscribe({
        next: (newComment: ArticleComment) => program.comments.push(newComment),
        error: (err: any) => console.error(err)
      });
  }
}
