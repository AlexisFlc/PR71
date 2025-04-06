import {Component, OnInit} from '@angular/core';
import {DietComment, DietProgram} from '../../models/diet-program.model';
import {DietProgramService} from '../../services/diet-program.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {CommonModule, NgClass, NgStyle} from '@angular/common';
import {FooterComponent} from '../footer/footer.component';

@Component({
  selector: 'app-diet-program',
  templateUrl: './diet-program.component.html',
  imports: [
    CommonModule,
    NavbarComponent,
    NgStyle,
    NgClass,
    FooterComponent
  ],
  styleUrls: ['./diet-program.component.scss']
})
export class DietProgramComponent implements OnInit {
  dietPrograms: DietProgram[] = [];

  constructor(private dietProgramService: DietProgramService) {
  }

  ngOnInit(): void {
    this.loadDietPrograms();
  }

  loadDietPrograms(): void {
    this.dietProgramService.getDietPrograms().subscribe({
      next: (data: DietProgram[]) => this.dietPrograms = data,
      error: (err) => console.error(err)
    });
  }

  toggleFavorite(program: DietProgram): void {
    program.isFavorite = !program.isFavorite;
    this.dietProgramService.toggleFavorite(program.id, program.isFavorite)
      .subscribe({
        next: () => console.log('Favori mis à jour'),
        error: (err) => console.error(err)
      });
  }

  addRating(program: DietProgram, rating: number): void {
    this.dietProgramService.addRating(program.id, rating)
      .subscribe({
        next: (res) => {
          program.rating = res.rating;
          program.numberOfRatings = res.numberOfRatings;
        },
        error: (err) => console.error(err)
      });
  }

  addComment(program: DietProgram, commentText: string, user = 'Anonymous'): void {
    if (!commentText) {
      return;
    }
    this.dietProgramService.addComment(program.id, user, commentText)
      .subscribe({
        next: (newComment: DietComment) => program.comments.push(newComment),
        error: (err) => console.error(err)
      });
  }
}
