import { Component, OnInit } from "@angular/core";
import {
  AuthenticationService,
  DistanceService,
  CommentService,
  UserService,
  TypeService,
  CategoryService,
} from "@app/services";
import {
  Help,
  User,
  HelpType,
  HelpCategory,
  HelpResponse,
  Comment,
  Post,
} from "@app/models";
import { ActivatedRoute } from "@angular/router";
import { ForumPostService } from "@app/services/forum-post.service";


@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  currentUser: User = null;
  posts: Post[] = [];

  constructor(
    private fps: ForumPostService,
    private as: AuthenticationService,

    private actRoute: ActivatedRoute
  ) {
    this.getCurrentUser();
  }

  ngOnInit(): void {
    /* const idPost = this.actRoute.snapshot.params.id;
    this.cs.getAll<Comment[]>( idPost, null, null, null).subscribe(res => {
      this.comments = res;
     console.log(this.comments)
  });*/

    this.fps.getAll(null, null).subscribe((res) => {
      this.posts = res;
      console.log(this.posts);
    });
  }

  post(): void {
    this.fps.getAll;
  }

  getCurrentUser(): void {
    this.as.getCurrentUser().subscribe((x) => {
      this.currentUser = x;
    });
  }

   

 



}