import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css']
})
export class ForumDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hideIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:none;");
    navigation.classList.remove("hide");
  }
  
  showIconBar(){
    var iconBar = document.getElementById("iconBar");
    var navigation = document.getElementById("navigation");
    iconBar.setAttribute("style", "display:block;");
    navigation.classList.add("hide");
  }
  
  //Comment
  showComment(){
    var commentArea = document.getElementById("comment-area");
    commentArea.classList.remove("hide");
  }
  
  //Reply
  showReply(){
    var replyArea = document.getElementById("reply-area");
    replyArea.classList.remove("hide");
  }

}
