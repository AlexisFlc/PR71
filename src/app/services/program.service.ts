import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SportProgram, ArticleComment} from '../models/program.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:8080/api/programs';

  constructor(private http: HttpClient) {
  }

  getPrograms(): Observable<SportProgram[]> {
    return this.http.get<SportProgram[]>(this.apiUrl);

  }

  toggleFavorite(programId: number, isFavorite: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/${programId}/favorite`, {isFavorite});
  }

  addRating(programId: number, rating: number): Observable<{ rating: number; numberOfRatings: number }> {
    return this.http.post<{ rating: number; numberOfRatings: number }>(`${this.apiUrl}/${programId}/rating`, {rating});
  }

  addComment(programId: number, user: string, comment: string): Observable<ArticleComment> {
    return this.http.post<ArticleComment>(`${this.apiUrl}/${programId}/comment`, {user, comment});
  }
}
