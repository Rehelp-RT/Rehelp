import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumPost, User,Comment } from '@app/models';
import { AuthenticationService, CommentService, ForumPostService } from '@app/services';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  forumPost: ForumPost = null;
  currentUser: User = null;
  comment: Comment[] =[];


  constructor(
    private fps: ForumPostService,
    private actRoute: ActivatedRoute,
    private as: AuthenticationService,
  
    private cs : CommentService
    ) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    this.getForumPost(id);
    this.currentUser = this.as.currentUserValue;
    this.getComment(id);
  }
  getForumPost(id: number): void {
    this.fps.getById(id)
      .subscribe(forumPost => {
        this.forumPost = forumPost;
      });
  }

  getComment(idPost:number):void{
    this.cs.getAll(idPost).subscribe((res) => {
      this.comment = res.map(el => {
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
      })

     
    });;
  


  }
  hideIconBar() {
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
  }

  showIconBar() {
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
  }

  //Comment
  showComment() {
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
  }

  //Reply
  showReply() {
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
  }

  

}
