import { Component, OnInit } from '@angular/core';
import { ForumPost } from '@app/models';
import { ForumPostService } from '@app/services';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  posts: ForumPost[] = [];

  constructor(private fps: ForumPostService) {}

  ngOnInit(): void {
    
    /* const idPost = this.actRoute.snapshot.params.id;
    this.cs.getAll<Comment[]>( idPost, null, null, null).subscribe(res => {
      this.comments = res;
     console.log(this.comments)
  });*/

    this.fps.getAll().subscribe((res) => {
      this.posts = res.map(el => {
        const t: ForumPost = {
          id: el.id,
          idCategory: el.idCategory,
          idCreator: el.idCreator,
          image: el.image,
          title: el.title,
          description: el.description,
          createdAt: new Date(el.createdAt),
          updatedAt: new Date(el.updatedAt),
          author: el.author,
          category: el.category
        };
        return t;
      });
      console.log(this.posts);
    });
  }

  getDate( date: Date) {
    return date.toDateString();
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

}
