import { Component, ViewChild, ElementRef, Input, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Comment, User } from '@app/models';
import { AuthenticationService, CommentService } from '@app/services';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input()

  @Input() receivedIdHelp: number = null;
  @Input() receivedIdPost: number = null;

  model: Comment;
  postComments: Comment[] = [];
  check: boolean = false;
  currentUser: User = null;
  commentForm: FormGroup;

  constructor(
    private cs: CommentService,
    private as: AuthenticationService,
    private formBuilder: FormBuilder,

    ) { this.getCurrentUser(); }

  open() {
    this.check = !this.check;
}

  ngOnInit(): void {
    this.getAllComments();
    this.model = new Comment();
  }

  getCurrentUser(): void {
    this.as.getCurrentUser().subscribe(x => {
        this.currentUser = x;
    });
}

  getAllComments() {
    this.cs.getAll(this.receivedIdPost, this.receivedIdHelp).subscribe((res) => {
      this.postComments = res.map(el => {
        const t: Comment = {
          id: el.id,
          idPost: el.idPost,
          idHelp: el.idHelp,
          idCreator: el.idCreator,
          message: el.message,
          createdAt: el.createdAt,
          updatedAt: el.updatedAt,
          author: el.author,
        };
        return t;
      });
      console.log(res);
    });
    
  }

  addComment() {
    this.model.message = (<HTMLInputElement>document.getElementById("message")).value;
    this.model.idPost = this.receivedIdPost;
    this.model.idHelp = this.receivedIdHelp;
    this.model.idCreator = this.currentUser.id;
    this.model.author = this.currentUser;
    
    this.cs.addComment(this.model).subscribe((res) => {
      this.postComments.push(this.model);
    },
    err => {
      console.log(err);
    });
  }

  deleteComment(id) {
    this.cs.deleteComment(id).subscribe(() => {
      // TODO:
      // this.router.navigate(['/helps/', this.model.id]);
    },
    err => {
      console.log(err);
    });
  }

  updateComment() {
    this.cs.updateComment(this.model).subscribe(() => {
      // TODO:
      // this.router.navigate(['/helps/', this.model.id]);
    },
    err => {
      console.log(err);
    });
  }

  refresh(): void {
    window.location.reload();
}

}
