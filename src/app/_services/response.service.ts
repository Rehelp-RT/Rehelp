import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Help } from '@app/_models';

import { environment } from '@environments/environment';

const api = environment.apiUrl;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class ResponseService {
  constructor(private http: HttpClient) {}

  acceptResponse(response: Response) {
    return this.http.put<any>(`${environment.apiUrl}/responses/accept/` + response.id, {});
  }

  cancelResponse(response: Response) {
    return this.http.put<any>(`${environment.apiUrl}/responses/cancel/` + response.id, {});
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
