import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { TradeTypes } from '@app/models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private api = environment.apiUrl;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<TradeTypes[]>(`${this.api}/trades`);
  }
}
