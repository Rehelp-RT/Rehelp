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
            this.isOwner = params.id === this.authService.currentUserValue.id.toString();

            if (this.isOwner) {
                this.authService.getCurrentUser().subscribe(x => {
                    this.user = x;
                });
            } else {
                this.userService.getById(params.id).subscribe(x => {
                    this.user = x;
                });
            }
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

    getAverage(): number {
        return (this.user.responsesReviewsSum + this.user.helpsReviewsSum) /
          (this.user.responsesReviewsCount + this.user.helpsReviewsCount);
    }

    getReviews(): number {
      if (isNaN(this.user.responsesReviewsCount + this.user.helpsReviewsCount)) {
        return 0;
      } else {
        return (this.user.responsesReviewsCount + this.user.helpsReviewsCount);
      }
    }
}
