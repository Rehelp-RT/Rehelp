import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '@app/_models';

import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Category[]>(`${environment.apiUrl}/categories`);
  }

}
