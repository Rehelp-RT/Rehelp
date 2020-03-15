import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getById(id: number) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
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
