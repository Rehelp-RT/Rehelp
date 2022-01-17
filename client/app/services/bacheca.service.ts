import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { BachecaPost } from '@app/models/bachecaPost';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BachecaService {

  constructor(private http: HttpClient) { }

  getAll() {
    // let params = "?completed=true";
    return this.http.get<BachecaPost[]>(`${environment.apiUrl}/bachecaPosts`);
  }

  getById(id: number) {
    return this.http.get<BachecaPost>(`${environment.apiUrl}/bachecaPosts/${id}`);
  }

  deleteBachecaPost(id: number) {
    return this.http.delete<BachecaPost>(`${environment.apiUrl}/bachecaPosts/delete/${id}`);
  }

  addBachecaPost(bachecaPost: BachecaPost) {
    return this.http.post<any>(`${environment.apiUrl}/bachecaPosts/add`, bachecaPost)
      .pipe(map(x => {
        return x;
      }));
  }

  updateBachecaPost(bachecaPost: BachecaPost) {
    return this.http.put<any>(`${environment.apiUrl}/bachecaPosts/update/` + bachecaPost.id, bachecaPost)
        .pipe(map(x => {
            return x;
        }));
  }

}
