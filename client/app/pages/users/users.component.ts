import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { UserService, AuthenticationService } from '@app/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  distance: Number = null;
  defaultDistance: Number[] = [0, 10, 20, 50, 100];
  public selectedDistance: Number;
  currentUser: User = null;
  
  constructor(private us: UserService,
    private as: AuthenticationService) {
    this.getCurrentUser();
   }

  ngOnInit() {
    const lat = this.currentUser.latitude //43.0554254;
    const long = this.currentUser.longitude //13.4303147;

    this.us.getAll(this.distance, lat, long).subscribe((x) => {
      this.users = x;
    });
  }

  getAge(birthdate) {
    const datenew = new Date();
    const dateold = new Date(birthdate);
    const ynew = datenew.getFullYear();
    const mnew = datenew.getMonth();
    const dnew = datenew.getDate();
    const yold = dateold.getFullYear();
    const mold = dateold.getMonth();
    const dold = dateold.getDate();
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

  getAverage(user: User): number {
    let count = 0;
    let sum = 0;
    user.helps.forEach(h => {
      count ++;
      sum += h.responses[0].ratingResponder;
    });
    user.responses.forEach(r => {
      count++;
      sum += r.ratingCreator;
    });
    return sum / count;
  }

  distanceSelected() {
    this.distance = this.selectedDistance;
    console.log('selectedDistance :', this.selectedDistance);
}

getCurrentUser(): void {
  this.as.getCurrentUser()
    .subscribe(x => {
      this.currentUser = x;
    });
}
}
