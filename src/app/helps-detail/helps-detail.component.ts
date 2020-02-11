import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
import {  Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  author: boolean;
  model: Help = null;
  currentUser: User = null;
  accepted = false;
  completed = false;

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
        this.accepted = x.responses.some((y) => {
          return y.accepted;
        });
        this.completed = x.responses.some((y) => {
          return y.completed;
        });
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
    if (this.currentUser.username === this.model.creator.username) {
      this.author = true;
    } else {
      this.author = false;
    }
  }

  accept(response: HelpResponse): void {
    this.accepted = true;
    this.rs.acceptResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  cancel(response: HelpResponse): void {
    this.accepted = false;
    this.rs.cancelResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  complete(response: HelpResponse): void {
    this.completed = true;
    this.rs.completeResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  deleteHelp() {
    this.hs.deleteHelp(this.model)
    .subscribe(x =>
      this.router.navigate(['/helps'])
    );
  }
}
