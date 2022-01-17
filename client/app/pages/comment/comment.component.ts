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

  model: Comment = null;
  // comment: string = null;
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

// post() {
//   this.postComment.push(this.comment);
//   this.comment = "";
// }


  ngOnInit(): void {
    // this.initForm();
    this.getAllComments();
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

  // get f() { return this.commentForm.controls; }

  //   private initForm() {
  //       this.commentForm = this.formBuilder.group({
  //         description: [this.model.message, Validators.required]
  //       });
  //   }

  addComment() {
    // this.model.message = this.f.message.value;
    // console.log(this.f.message.value)
    this.cs.addComment(this.model).subscribe((res) => {
      // TODO:
      // this.router.navigate(['/helps/', this.model.id]);
    },
    err => {
      console.log(err);
    });
  }

  deleteComment() {
    this.cs.deleteComment(this.model.id).subscribe(() => {
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

}
