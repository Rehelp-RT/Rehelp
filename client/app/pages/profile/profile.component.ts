import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService, UserService } from '@app/services';
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
            this.currentUser =
                cu === undefined || cu == null
                ? null
                : cu.username;
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

    groupBy(objectArray, property) {
        return objectArray.reduce((acc, obj) => {
            const key = obj[property];
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(obj);
            return acc;
        }, {});
    }

    getAverage() {

        // sum responses rating
        const ratedResponses = this.user.responses.filter(r => {
            if (r.ratingCreator !== undefined) {
                return r.ratingCreator;
            }
        });
        const sumResponses = ratedResponses.reduce((prev, cur) => {
          return prev + cur.ratingCreator;
        }, 0);

        // sum responses of help rating
        const ratedHelps = this.user.helps.filter(h => {
          const ress = h.responses.filter(r => {
              if (r.ratingResponder !== undefined) {
                  return r.ratingResponder;
              }
          });
          return (ress.length > 0) ? h : null;
        });
        const ratedHelpsResponses =
            ratedHelps.map(h =>
                h.responses.filter(r =>
                    (r.ratingResponder)));
        const flatArray = Array.prototype.concat.apply([], ratedHelpsResponses);
        const sumHelps = flatArray.reduce((prev, cur) => {
          return prev + cur.ratingResponder;
        }, 0);

        const average = (sumResponses + sumHelps) / (ratedResponses.length + ratedHelps.length);

        console.log('-------------------');
        console.log('this.user.responses', this.user.responses);
        console.log('responses', ratedResponses.length);
        console.log('sumResponses', sumResponses);
        console.log('this.user.helps', this.user.helps);
        console.log('helps', ratedHelps.length);
        console.log('sumHelps', sumHelps);
        console.log('-------------------');
        return average.toFixed(1);
    }
}
