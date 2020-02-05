import { Component, OnInit } from '@angular/core';
import { HelpService, ResponseService, AuthenticationService } from '@app/_services';
import { Help, User } from '@app/_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-detail',
  templateUrl: './helps-detail.component.html',
  styleUrls: ['./helps-detail.component.css']
})
export class HelpsDetailComponent implements OnInit {

  help: Help = null;
  creator: User = null;
  currentUser: User = null;
  author: boolean = null;

  constructor(
    private hs: HelpService,
    private actRoute: ActivatedRoute,
    private as: AuthenticationService,
    private rs: ResponseService) { }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    this.getHelp(id);
    this.getCurrentUser();
  }

  getHelp(id: number): void {
    this.hs.getById(id)
      .subscribe(x => {
        this.help = x;
        this.creator = x.User;
        this.getAutore();
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  getAutore(): void {
    if (this.currentUser.username === this.creator.username) {
      this.author = true;
    } else {
      this.author = false;
    }
  }

  accept(response: Response): void {
    this.rs.acceptResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }

  cancel(response: Response): void {
    this.rs.cancelResponse(response)
      .subscribe(x => {
        this.getHelp(x.id_help);
      });
  }
}
