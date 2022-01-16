import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BachecaPost } from '@app/models/bachecaPost';
import { HelpResponse } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class BachecaService {

  constructor(private http: HttpClient) { }

  getAll() {
    let params = "?completed=true";
    return this.http.get<HelpResponse[]>(`${environment.apiUrl}/responses${params}`);
  }

}
