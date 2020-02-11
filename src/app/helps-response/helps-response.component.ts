import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
import { Router, ActivatedRoute } from '@angular/router';

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
    private router: Router,
    private as: AuthenticationService,
    private rs: ResponseService) {
      const id = this.actRoute.snapshot.params.id;
      this.getHelp(id);
     }

  ngOnInit() {
    this.getCurrentUser();
  }

  getHelp(id: number): void {
    this.hs.getById(id)
      .subscribe(x => {
        this.response = new HelpResponse();
        this.response.help = x;
        this.response.responder = this.currentUser;
        this.response.idHelp = x.id;
        this.response.idResponder = this.currentUser.id;
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
    this.rs.addResponse(this.response).subscribe(
      res => {
        this.router.navigate(['/helps/', this.response.help.id]);
      },
      err => {
        console.log(err);
      }
    );
  }
}
