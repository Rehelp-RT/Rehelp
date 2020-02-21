import { Component, OnInit } from '@angular/core';
import { AuthenticationService, HelpService, ResponseService } from '@app/_services';
import { Help, HelpResponse, User } from '@app/_models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-helps-complete',
  templateUrl: './helps-complete.component.html',
  styleUrls: ['./helps-complete.component.css']
})
export class HelpsCompleteComponent implements OnInit {

  model: Help = null;
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
      });
  }

  getCurrentUser(): void {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });
  }

}
