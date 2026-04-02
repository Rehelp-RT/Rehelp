import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Notification, User } from '@app/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Notification[]>(`${environment.apiUrl}/notifications`);
  }

  getByUser(id: number): Observable<Notification[]> {
      return this.http.get<Notification[]>(`${environment.apiUrl}/notifications/user/${id}`);
  }

  checkNotification(id: number) {
    return this.http.put<Notification>(`${environment.apiUrl}/notifications/check/` + id, {});
  }

}
