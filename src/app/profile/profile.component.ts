import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService, UserService } from '@app/_services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  currentUser: User;

  constructor(
    private actRoute: ActivatedRoute,
    private as: AuthenticationService,
    private us: UserService) { 
      this.as.currentUser.subscribe(x => {
        this.currentUser = x;
      });
    }

  ngOnInit() {
    const id = this.actRoute.snapshot.params.id;
    if (id == null) {
      this.as.currentUser.subscribe(x => {
        this.user = x;
      });
    } else {
      this.us.getById(id).subscribe(x => {
        this.user = x ;
      });
    }
  }

}
