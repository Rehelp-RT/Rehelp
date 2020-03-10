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
    currentUser: string = null;
    isSyncAnimated = true;

    constructor(
        private actRoute: ActivatedRoute,
        private as: AuthenticationService,
        private us: UserService) { }

    ngOnInit() {
        // get current user
        this.as.currentUser.subscribe(cu => {
            this.currentUser = cu.username;
            const id = this.actRoute.snapshot.params.id;
            // get user profile
            if (id == null) {
                this.us.getById(cu.id).subscribe(x => {
                    this.user = x;
                });
            } else {
                this.us.getById(id).subscribe(x => {
                    this.user = x;
                });
            }
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

    getAverage(): number {
        const ratedResponses = this.user.responses.filter(r => {
            if (r.ratingCreator !== undefined) {
                return r.ratingCreator;
            }
        });
        const ratedHelps = this.user.helps.filter(h => {
            const ress = h.responses.filter(r => {
                if (r.ratingResponder !== undefined) {
                    return r.ratingResponder;
                }
            });
            return (ress.length > 0) ? h : null;
        });
        const sumResponses = ratedResponses.reduce((prev, cur) => {
          return prev + cur.ratingCreator;
        }, 0);
        const average = sumResponses / (ratedResponses.length);

        console.log('this.user.responses', this.user.responses);
        console.log('ratedResponses', ratedResponses);
        console.log('sumResponses', sumResponses);
        console.log('ratedHelps', ratedHelps);
        return average;
    }
}
