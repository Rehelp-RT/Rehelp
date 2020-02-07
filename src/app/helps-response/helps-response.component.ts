import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-response',
  templateUrl: './helps-response.component.html',
  styleUrls: ['./helps-response.component.css']
})
export class HelpsResponseComponent implements OnInit {

  author: boolean;
  response: HelpResponse;
  creator: User = null;
  currentUser: User = null;

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
        this.response = new HelpResponse();
        this.response.help = x;
        this.response.responder = x.User;
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

  onSubmit() {
    console.log(this.response);
  }
}
