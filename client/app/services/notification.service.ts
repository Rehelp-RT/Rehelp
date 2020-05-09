import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { Notification, User } from '@app/models';
import { Observable } from 'rxjs';
import { Twilio } from 'twilio';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private http: HttpClient) { }

  accountSid = '***REMOVED-TWILIO-SID***';
  authToken = '***REMOVED-TWILIO-TOKEN***';
  client = new Twilio(this.accountSid, this.authToken)

  getAll() {
    return this.http.get<Notification[]>(`${environment.apiUrl}/notifications`);
  }

  getByUser(id: number): Observable<Notification[]> {
      return this.http.get<Notification[]>(`${environment.apiUrl}/notifications/user/${id}`);
  }

  checkNotification(id: number) {
    return this.http.put<Notification>(`${environment.apiUrl}/notifications/check/` + id, {});
  }

  sendMessage(distance = null, lat = null, long = null){

    let params = '';
    params += distance != null ? 'distance=' + distance + '&' : '';
    params += lat != null ? 'lat=' + lat + '&' : '';
    params += long != null ? 'long=' + long : '';
    if (params !== '') {
        params = '?' + params;
    }
    console.log('params', params);

    return this.http.get<User>(`${environment.apiUrl}/notifications/sms${params}`);
  }
}
