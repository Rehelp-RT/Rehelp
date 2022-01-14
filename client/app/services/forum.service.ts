import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { ForumPost } from "@app/models";
import { environment } from "@environments/environment";
import { catchError, tap, map } from 'rxjs/operators';
@Injectable({
  providedIn: "root",
})
export class ForumPostService {
  constructor(private http: HttpClient) {}

  getAll(
    idCAtegory = null,
    idCreator = null,
    title = null,
    description = null
  ) {
    let params = "";
    params += idCAtegory ? "idCAtegory=" + idCAtegory + "&" : "";
    params += idCreator ? "idCreator=" + idCreator + "&" : "";
    params += title ? "title=" + title + "&" : "";
    params += description ? "description=" + description + "&" : "";
    if (params !== "") {
      params = "?" + params;
    }

    return this.http.get<ForumPost[]>(`${environment.apiUrl}/forumPosts${params}`);
  }

  getById(id: number) {
    return this.http.get<ForumPost>(`${environment.apiUrl}/forumPosts/${id}`);
  }

  deleteForumPost(id: number) {
    return this.http.delete<ForumPost>(`${environment.apiUrl}/forumPosts/delete/${id}`);
  }

  addForumPost(forumPost: ForumPost) {
    return this.http.post<any>(`${environment.apiUrl}/forumPosts/add`, forumPost)
      .pipe(map(x => {
        return x;
      }));
}

updateHelp(forumPost: ForumPost) {
  return this.http.put<any>(`${environment.apiUrl}/forumPosts/update/` + forumPost.id, forumPost)
      .pipe(map(x => {
          return x;
      }));
}

  
}