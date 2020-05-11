import { Component, OnInit } from '@angular/core';
import { User, HelpCategory, HelpType } from '@app/models';
import { UserService, AuthenticationService, CategoryService, TypeService } from '@app/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  type: HelpType;
  users: User[] = [];
  defaultDistance: Number[] = [10, 20, 50, 100];
  public selectedDistance = null;
  currentUser: User = null;

  lat: Number = null
  long: Number = null

  // category
  categories: HelpCategory[] = [];
  public idCat1 = null;
  public idCat2 = null;
  public idCat3 = null;

  constructor(
    private activeRoute: ActivatedRoute,
    private as: AuthenticationService,
    private cs: CategoryService,
    private ts: TypeService,
    private us: UserService) { }

  ngOnInit() {
    this.as.getCurrentUser()
      .subscribe(x => {
        this.currentUser = x;
      });

    this.lat = this.currentUser.latitude;
    this.long = this.currentUser.longitude;

    const codeType =
      this.activeRoute.snapshot.queryParamMap.get('type')
        ? this.activeRoute.snapshot.queryParamMap.get('type')
        : 'MEH';
    this.ts.getByCode(codeType).subscribe(type => {
      this.type = type;
    })

    this.cs.getAll().subscribe(cats => {
      this.categories = cats;
    });

    this.us.getAll(this.currentUser.id).subscribe(users => {
      console.log('users', users);
      this.users = users;
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
    this.us.getAll(this.currentUser.id, cat, this.selectedDistance, this.lat, this.long).subscribe((x) => {
      this.users = x;
    });
  }

}
