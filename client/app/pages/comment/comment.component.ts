import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor() { }


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


  ngOnInit(): void {
  }

}
