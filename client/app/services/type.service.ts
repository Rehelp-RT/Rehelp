import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpType } from '@app/models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getByCode(code: string) {
    return this.http.get<HelpType>(`${environment.apiUrl}/types/${code}`);
  }
}
