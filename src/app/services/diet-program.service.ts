import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DietComment, DietProgram} from '../models/diet-program.model';

@Injectable({
  providedIn: 'root'
})
export class DietProgramService {
  private apiUrl = 'http://localhost:8080/api/diet-programs';

  constructor(private http: HttpClient) {
  }

  getDietPrograms(): Observable<DietProgram[]> {
    return this.http.get<DietProgram[]>(this.apiUrl);
  }

  toggleFavorite(programId: number, isFavorite: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/${programId}/favorite`, {isFavorite});
  }

  addRating(programId: number, rating: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${programId}/rating`, {rating});
  }

  addComment(programId: number, user: string, comment: string): Observable<DietComment> {
    return this.http.post<DietComment>(`${this.apiUrl}/${programId}/comment`, {user, comment});
  }
}
