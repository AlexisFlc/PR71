import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  private apiUrl = 'http://localhost:8080/api/programs';

  constructor(private http: HttpClient) {}

  getSportPrograms(userLevel: string, userGoal: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/sport?level=${userLevel}&goal=${userGoal}`);
  }

  getFoodPrograms(userLevel: string, userGoal: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/food?level=${userLevel}&goal=${userGoal}`);
  }
}
