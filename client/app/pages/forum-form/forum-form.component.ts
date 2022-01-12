import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forum-form',
  templateUrl: './forum-form.component.html',
  styleUrls: ['./forum-form.component.css']
})
export class ForumFormComponent implements OnInit {

  constructor(private http:HttpClient) { }

  onSubmit(data) {
    this.http.post('http://localhost:3000/buratti'.data).subscribe((result)=>{
      console.warn("result",result)
    })
    console.warn(data);
    
  }

  ngOnInit(): void {
  }

}
