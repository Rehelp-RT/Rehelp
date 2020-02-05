import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpResponse } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  constructor(private http: HttpClient) {}

  acceptResponse(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/accept/` + response.id, {});
  }

  cancelResponse(response: HelpResponse) {
    return this.http.put<any>(`${environment.apiUrl}/responses/cancel/` + response.id, {});
  }
}
