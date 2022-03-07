import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  DistanceService,
  CommentService,
  UserService,
  TypeService,
  CategoryService,
  BachecaService,
} from "@app/services";
import {
  Help,
  User,
  HelpType,
  HelpCategory,
  HelpResponse,
  Comment,
  ForumPost,
} from "@app/models";
import { ActivatedRoute } from "@angular/router";
import { ForumPostService } from "@app/services/forum.service";
import { BachecaPost } from "@app/models/bachecaPost";
import { createUnionOrIntersectionTypeNode } from "typescript";

@Component({
  selector: "app-bacheca",
  templateUrl: "./bacheca.component.html",
  styleUrls: ["./bacheca.component.css"],
})
export class BachecaComponent implements OnInit {
  posts: BachecaPost[] = [];

  // comment = "";
  // postComment = [];

  // check = false;

  // open() {
  //     if(this.check==false){
  //       this.check=true;
  //     }else{
  //       this.check=false;
  //     }
  // }

  // post() {
  //   this.postComment.push(this.comment);
  //   this.comment = "";
  // }

  constructor(private bs: BachecaService) {}

  ngOnInit(): void {
    /* const idPost = this.actRoute.snapshot.params.id;
    this.cs.getAll<Comment[]>( idPost, null, null, null).subscribe(res => {
      this.comments = res;
     console.log(this.comments)
  });*/

    this.bs.getAll().subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  getDate(date: Date) {
    return new Date(date).toDateString();
  }

  getAvatar(user: User): string {
    if (user.avatar != null) {
        return 'https://res.cloudinary.com/hwbyvepex/image/upload/' + user.avatar;
    } else if (user.loginFacebook && user.idFacebook) {
        return user.idFacebook;
    } else if (user.loginGoogle && user.idGoogle) {
        return user.idGoogle;
    } else {
        return 'assets/img/avatar_64.png';
    }
}
}
