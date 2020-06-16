import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HelpCategory } from '@app/models';

import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) {}

    getAll(idHelpType: number = null) {
        let params = '';
        params += idHelpType != null ? 'idHelpType=' + idHelpType + '&' : '';
        if (params !== '') {
            params = '?' + params;
        }

        return this.http.get<HelpCategory[]>(`${environment.apiUrl}/categories${params}`);
    }

}
