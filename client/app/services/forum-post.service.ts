import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Post } from "@app/models";
import { environment } from "@environments/environment";
@Injectable({
  providedIn: "root",
})
export class ForumPostService {
  constructor(private http: HttpClient) {}

  getAll(
    idCAtegory = null,
    idCreator = null,
  ) {
    let params = "";
    params += idCAtegory ? "idCAtegory=" + idCAtegory + "&" : "";
    params += idCreator ? "idCreator=" + idCreator + "&" : "";
    if (params !== "") {
      params = "?" + params;
    }
    // console.log('get users params', params);

    return this.http.get<Post[]>(`${environment.apiUrl}/forumPosts${params}`);
  }

  getById(id: number) {
    return this.http.get<Post>(`${environment.apiUrl}/forumPosts/${id}`);
  }


  
}