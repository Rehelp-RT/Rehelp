import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forum-post',
  templateUrl: './forum-post.component.html',
  styleUrls: ['./forum-post.component.css']
})
export class ForumPostComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  //NavBar
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
