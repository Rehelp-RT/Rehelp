import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpResponse } from '@app/models';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(idResponder: number = null, accepted: boolean = null) {
    let params = '';
    params += idResponder != null ? 'idResponder=' + idResponder + '&' : '';
    params += accepted != null ? 'accepted=' + accepted + '&' : '';
    if (params !== '') {
      params = '?' + params;
    }
    console.log('params', params);

    return this.http.get<HelpResponse[]>(`${this.api}/responses${params}`);
  }

  addResponse(response: HelpResponse) {
    return this.http.post<any>(`${this.api}/responses/add`, response)
      .pipe(map(x => {
        return x;
      }));
  }

  acceptResponse(response: HelpResponse) {
    return this.http.put<any>(`${this.api}/responses/accept/` + response.id, {});
  }

  cancelResponse(response: HelpResponse) {
    return this.http.put<any>(`${this.api}/responses/cancel/` + response.id, {});
  }

  creatorFeedback(response: HelpResponse) {
    return this.http.put<any>(`${this.api}/responses/feedback/` + response.id, response);
  }
  
  collectiveFeedback(response: HelpResponse) {
    return this.http.put<any>(`${this.api}/responses/cohFeedback/` + response.id, response);
  }

  completeResponse(response: HelpResponse) {
    return this.http.put<any>(`${this.api}/responses/complete/` + response.id, response);
  }

  deleteResponse(response: HelpResponse) {
    return this.http.delete<any>(`${this.api}/responses/delete/` + response.id, {});
  }
}
