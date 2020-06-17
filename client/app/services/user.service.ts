import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User, HelpCategory } from '@app/models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(excludeUserId = null, type = null, category = null, distance = null, lat = null, long = null) {

        let params = '';
        params += excludeUserId ? 'excludeUserId=' + excludeUserId + '&' : '';
        params += type ? 'type=' + type + '&' : '';
        params += category ? 'category=' + category + '&' : '';
        params += distance ? 'distance=' + distance + '&' : '';
        params += lat ? 'lat=' + lat + '&' : '';
        params += long ? 'long=' + long : '';
        if (params !== '') {
            params = '?' + params;
        }
        // console.log('get users params', params);

        return this.http.get<User[]>(`${environment.apiUrl}/users${params}`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getCategories(id: number, idType = null) {
        let params = '';
        params += idType != null ? 'idType=' + idType : '';
        if (params !== '') {
            params = '?' + params;
        }
        // console.log('id', id);
        // console.log('params', params);
        
        return this.http.get<User>(`${environment.apiUrl}/users/${id}/categories${params}`);
    }

    getCategories2(id: number) {
        return this.http.get<HelpCategory[]>(`${environment.apiUrl}/users/${id}/categories2`);
    }

    putCategories(idUser: number, idCategories: number[]) {
      return this.http.put(`${environment.apiUrl}/users/${idUser}/categories`, idCategories);
    }

    update(user: User) {
        return this.http.put<User>(`${environment.apiUrl}/users/${user.id}/update`, user);
    }

    updatePassword(user: User) {
      return this.http.put<User>(`${environment.apiUrl}/users/${user.id}/updatePassword`, user);
    }

    uploadAvatar(id: number, path: string) {
        return this.http.put<User>(`${environment.apiUrl}/users/${id}/upload-avatar`, { path });
    }

    delete(id: number) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`);
    }
}
