import { Component, OnInit } from '@angular/core';
import { ForumPost,User } from "@app/models";
import { ForumPostService, AuthenticationService } from "@app/services";


@Component({
    selector: 'app-forum-post',
    templateUrl: './forum-post.component.html',
    styleUrls: ['./forum-post.component.css'],
    standalone: false
})
export class ForumPostComponent implements OnInit {

 
    posts: ForumPost[] = [];
    searchText: string;
    currentUser: User = null;
  
    constructor(private fps: ForumPostService, private as: AuthenticationService,) {this.getCurrentUser();}
  
    ngOnInit(): void {
      /* const idPost = this.actRoute.snapshot.params.id;
      this.cs.getAll<Comment[]>( idPost, null, null, null).subscribe(res => {
        this.comments = res;
       console.log(this.comments)
    });*/
  
      this.fps.getAll().subscribe((res) => {
        this.posts = res.map((el) => {
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
            category: el.category,
            
          };
          return t;
        });
        console.log(this.posts);
      });
    }
  
    getDate(date: Date) {
      return date.toDateString();
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
  
    Search() {
      if(this.searchText != ""){
        this.posts = this.posts.filter(res=>{
          return res.title.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase());
        });
      }else if(this.searchText == "") {
        this.ngOnInit();
      }
      
      
      //searchText = searchText.toLocaleLowerCase();
  
      /* this.posts.filter(x => {
        if( x.title.toLocaleLowerCase().includes(searchText)){
       
          x.title.toLocaleLowerCase().includes(searchText)
  
         console.log(this.posts);
        } else {
          this.posts = [];
          console.log(this.posts);
        }
         
        // x.toLocaleLowerCase().includes(searchText);
      });*/
    }
  
    getCurrentUser(): void {
      this.as.getCurrentUser().subscribe(x => {
          this.currentUser = x;
      });
  
    }
  
  
  
}
