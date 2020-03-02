import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Feedback } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Feedback[]>(`${environment.apiUrl}/feedback`);
  }
/*
  getById(id: number) {
    return this.http.get<Help>(`${environment.apiUrl}/helps/${id}`);
  }
  */
  addFeedback(feedback: Feedback) {
    return this.http.post<any>(`${environment.apiUrl}/feedback/add`, feedback)
      .pipe(map(x => {
        return x;
      }));
  }
/*
  deleteResponse(response: HelpResponse) {
    return this.http.delete<any>(`${environment.apiUrl}/responses/delete/` + response.id, {});
  }
  */
}
