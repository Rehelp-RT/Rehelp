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
      this.us.getById(this.currentUser.id).subscribe(x => {
        this.user = x;
      });
    } else {
      this.us.getById(id).subscribe(x => {
        this.user = x;
      });
    }
  }

  getAge(birthdate: Date) {
    const datenew = new Date();
    const ynew = datenew.getFullYear();
    const mnew = datenew.getMonth();
    const dnew = datenew.getDate();
    const yold = birthdate.getFullYear();
    const mold = birthdate.getMonth();
    const dold = birthdate.getDate();
    let diff = ynew - yold;
    if (mold > mnew) {
      diff--;
    } else {
        if (mold === mnew) {
            if (dold > dnew) {
              diff--;
            }
        }
    }
    return diff;
}

}
