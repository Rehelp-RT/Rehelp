import { Component, OnInit } from '@angular/core';
import { User } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => {
      this.currentUser = x;
    });
  }

}
