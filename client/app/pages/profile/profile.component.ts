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
    isOwner = false;
    isSyncAnimated = true;

    constructor(
        private actRoute: ActivatedRoute,
        private authService: AuthenticationService,
        private userService: UserService) { }

    ngOnInit() {
        this.actRoute.params.subscribe(params => {
            this.isOwner = params.id == this.authService.currentUserValue.id;
            this.userService.getById(params.id).subscribe(x => {
                this.user = x;
                console.log(this.user);
            });
        });
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

    public getAge(birthdate): number {
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

        const reviews = ratedHelpsResponses.length + ratedResponses.length;
        let average;

        if (sumResponses !== 0) {
            average = ((sumResponses + sumHelps) / (ratedResponses.length + ratedHelps.length)).toFixed(1);
        } else {
            average = 'Ancora nessuna recensione.';
        }

        return { average, reviews };
    }
}
