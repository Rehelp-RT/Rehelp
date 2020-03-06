import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpResponse } from '@app/_models';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  constructor(private http: HttpClient) {}

  addResponse(response: HelpResponse) {
    return this.http.post<any>(`${environment.apiUrl}/responses/add`, response)
      .pipe(map(x => {
        return x;
      }));
  }

  acceptResponse(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/accept/` + response.id, {});
  }

  cancelResponse(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/cancel/` + response.id, {});
  }

  creatorFeedback(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/feedback/` + response.id, response);
  }

  completeResponse(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/complete/` + response.id, response);
  }

  deleteResponse(response: HelpResponse) {
    return this.http.delete<any>(`${environment.apiUrl}/responses/delete/` + response.id, {});
  }
}
