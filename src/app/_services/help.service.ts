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
export class HelpService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Help[]>(`${environment.apiUrl}/helps`);
  }

  getById(id: number) {
    return this.http.get<Help>(`${environment.apiUrl}/helps/${id}`);
  }

  addHelp(help: Help) {
    return this.http.post<any>(`${environment.apiUrl}/helps/add`, help)
    .pipe(map(x => {
        return x;
    }));
  }
  
  deleteHelp(help: Help) {
    return this.http.delete<any>(`${environment.apiUrl}/helps/delete/` + help.id, {})
  }

  updateHelp(help: Help) {
    return this.http.put<any>(`${environment.apiUrl}/helps/update/` + help.id, {})
    .pipe(map(x => {
        return x;
    }));
  }

  // addHelps(help): Observable<Help> {
  //   return this.http.post<Help>(`${api}/create.php`, help, httpOptions).pipe(
  //     tap(() => console.log(`added help w/ id=${help.id}`)),
  //     catchError(this.handleError<Help>('addHelps'))
  //   );
  // }

  // getHelps(id: number): Observable<Help> {
  //   const url = `${api}?id=${id}`;
  //   return this.http.get<Help>(url).pipe(
  //     tap(() => console.log(`fetched help id=${id}`)),
  //     catchError(this.handleError<Help>(`getHelps id=${id}`))
  //   );
  // }


  // updateHelps(id, help): Observable<any> {
  //   const url = `${api}/update.php?id=${id}`;
  //   return this.http.put(url, help, httpOptions).pipe(
  //     tap(_ => console.log(`updated help id=${id}`)),
  //     catchError(this.handleError<any>('updateHelps'))
  //   );
  // }

  // deleteHelps(id): Observable<Help> {
  //   const url = `${api}/delete.php?id=${id}`;
  //   return this.http.delete<Help>(url, httpOptions).pipe(
  //     tap(_ => console.log(`deleted help id=${id}`)),
  //     catchError(this.handleError<Help>('deleteHelps'))
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
