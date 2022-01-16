import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '@environments/environment';
import { Comment } from '@app/models';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

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

    return this.http.get<Comment[]>(`${environment.apiUrl}/comments${params}`);
}

getById(id: number) {
  return this.http.get<Comment>(`${environment.apiUrl}/comments/${id}`);
}

deleteComment(id: number) {
  return this.http.delete<Comment>(`${environment.apiUrl}/comments/delete/${id}`);
}

addComment(comment: Comment) {
  return this.http.post<any>(`${environment.apiUrl}/comments/add`, comment)
    .pipe(map(x => {
      return x;
    }));
}

updateComment(comment: Comment) {
return this.http.put<any>(`${environment.apiUrl}/comments/update/` + comment.id, comment)
    .pipe(map(x => {
        return x;
    }));
}



}
