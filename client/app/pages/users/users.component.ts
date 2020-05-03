import { Component, OnInit } from '@angular/core';
import { User, HelpCategory } from '@app/models';
import { UserService, AuthenticationService, CategoryService } from '@app/services';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];
  defaultDistance: Number[] = [0, 10, 20, 50, 100];
  public selectedDistance = null;
  currentUser: User = null;

  //distance
  lat: Number = null
  long: Number = null
  
  // category
  categories: HelpCategory[] = [];
  public idCat1 = null;
  public idCat2 = null;
  public idCat3 = null;

  constructor(private us: UserService,
    private as: AuthenticationService,
    private cs: CategoryService) { 

    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });

    this.lat = this.currentUser.latitude;
    this.long = this.currentUser.longitude;

    this.cs.getAll().subscribe(x => {
      this.categories = x;
    });
  }

  ngOnInit() {
    this.us.getAll().subscribe((x) => {
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
      count++;
      sum += h.responses[0].ratingResponder;
    });
    user.responses.forEach(r => {
      count++;
      sum += r.ratingCreator;
    });
    return sum / count;
  }

  filter() {
    var cat = this.idCat3 != null ? this.idCat3 : this.idCat2;
    this.us.getAll(cat, this.selectedDistance, this.lat, this.long).subscribe((x) => {
      this.users = x;
    });
  }

}
