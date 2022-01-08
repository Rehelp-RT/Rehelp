import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { environment } from '@environments/environment';
import { Comment } from '@app/models';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private api = environment.apiUrl;
    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(private http: HttpClient) { }

  getAll(
    idPost = null, 
    idCreator = null, 
    idHelp = null, 
    message = null, ) {
    let params = '';
    params += idPost != null ? 'idPost=' + idPost + '&' : '';
    params += idHelp != null ? 'idHelp=' + idHelp + '&' : '';
    params += message != null ? 'message=' + message + '&' : '';
    params += idCreator != null ? 'idCreator=' + idCreator + '&' : '';
    if (params !== '') {
      params = '?' + params;
    }
    // console.log('params', params);

    return this.http.get<Comment[]>(`${this.api}/comments${params}`);
}


}
