import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Help } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Help[]>(`${environment.apiUrl}/helps`);
}

}
