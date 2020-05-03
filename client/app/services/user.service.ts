import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, HelpCategory } from '@app/models';

import { SocialUser } from 'angularx-social-login';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(category = null, distance = null, lat = null, long = null) {
        
        let params = '';
        params += category != null ? 'category=' + category + '&' : '';
        params += distance != null ? 'distance=' + distance + '&' : '';
        params += lat != null ? 'lat=' + lat + '&' : '';
        params += long != null ? 'long=' + long : '';
        if (params !== '') {
            params = '?' + params;
        }
        console.log('params', params);

        return this.http.get<User[]>(`${environment.apiUrl}/users${params}`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getCategories(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}/categories`);
    }

    getCategories2(id: number) {
        return this.http.get<HelpCategory[]>(`${environment.apiUrl}/users/${id}/categories2`);
    }

    putCategories(idUser: number, idCategories: number[]) {
      return this.http.put(`${environment.apiUrl}/users/${idUser}/categories`, idCategories);
    }

    register(user: User) {
        return this.http.post(`${environment.apiUrl}/signup`, user);
    }

    update(user: User) {
        return this.http.put<User>(`${environment.apiUrl}/users/${user.id}/update`, user);
    }

    uploadAvatar(id: number, path: string) {
        return this.http.put<User>(`${environment.apiUrl}/users/${id}/upload-avatar`, { path });
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
