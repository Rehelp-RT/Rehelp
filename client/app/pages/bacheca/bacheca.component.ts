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

  comment = "";
  postComment = [];

  check = false;
 

  open() {
      if(this.check==false){
        this.check=true;
      }else{
        this.check=false;
      }
  }
  

  post() {
    this.postComment.push(this.comment);
    this.comment = "";
  }

  constructor(private bs: BachecaService) {}

  ngOnInit(): void {
    
    /* const idPost = this.actRoute.snapshot.params.id;
    this.cs.getAll<Comment[]>( idPost, null, null, null).subscribe(res => {
      this.comments = res;
     console.log(this.comments)
  });*/

    this.bs.getAll().subscribe((res) => {
      this.posts = res.map(el => {
        const t: BachecaPost = {
          id: el.id,
          completed: el.completed,
          idHelp: el.help.id,
          idResponder: el.responder.id,
          messageCreator: el.messageCreator,
          messageResponder: el.messageResponder,
          imageReviewCreator: el.imageReviewCreator,
          imageReviewResponder: el.imageReviewResponder,
          creatorReviewedAt: el.creatorReviewedAt,
          responderReviewedAt: el.responderReviewedAt,
          ratingCreator: el.ratingCreator,
          ratingResponder: el.ratingResponder,
          help: el.help,
          responder: el.responder,
          creator: el.help.creator
        };
        return t;
      });
      console.log(this.posts);
    });
  }
}
