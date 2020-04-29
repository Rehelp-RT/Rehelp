import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { UserService } from '@app/services';

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
  
  constructor(private us: UserService) { }

  ngOnInit() {

    const lat = null //43.0554254;
    const long = null //13.4303147;

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
}

}
