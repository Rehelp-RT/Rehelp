import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  template: '<div class="app"><counter [init]="initialCount"></counter></div>',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  author: boolean;
  model: Help = null;
  creator: User = null;
  currentUser: User = null;

  constructor(
    private hs: HelpService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private as: AuthenticationService,
    private rs: ResponseService) { 
      const id = this.actRoute.snapshot.params.id;
      this.getHelp(id);
      this.getCurrentUser();
    }

  ngOnInit() {
  }

  getHelp(id: number): void {
    this.hs.getById(id)
      .subscribe(x => {
        this.model = x;
        this.creator = x.User;
        this.checkAuthor();
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  checkAuthor(): void {
    if (this.currentUser.username === this.creator.username) {
      this.author = true;
    } else {
      this.author = false;
    }
  }

  accept(response: HelpResponse): void {
    this.rs.acceptResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  cancel(response: HelpResponse): void {
    this.rs.cancelResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  deleteHelp(): void{
    this.hs.deleteHelp(this.model).subscribe(
      res => {
          this.router.navigate(['/helps']);
      },
      err => {
        console.log(err);
      });
  }
}
