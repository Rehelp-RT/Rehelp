import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { environment } from '@environments/environment';
import { Association } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class AssociationService {

  constructor(private http: HttpClient) { }

  // post request to the server

  getAssociations() {
    return this.http.get<Association[]>(`${environment.apiUrl}/associations`);
  }

  getById(id: number) {
    return this.http.get<Association>(`${environment.apiUrl}/associations/${id}`);
  }

}
