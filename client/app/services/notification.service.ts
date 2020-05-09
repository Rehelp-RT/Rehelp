import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { Notification } from '@app/models';
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

  sendMessage(){
    console.log('client', this.client);
    console.log('client.messages', this.client.messages);
    this.client.messages
    .create({
       body: 'Ho mandato questo messaggio di prova dal progetto rehelp-web',
       from: '+12513090971',
       to: '+393479717556'
     })
    .then(message => console.log('message.sid', message.sid));
  }
}
