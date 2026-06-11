import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService, UserService } from '@app/services';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    standalone: false
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

            this.userService.getById(params.id).subscribe(x => {
                this.user = x;
                if (this.isOwner) {
                    const current = this.authService.currentUserValue;
                    this.authService.refresh({ ...current, ...x, token: current.token });
                }
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

    getAge(): number {
        const datenew = new Date();
        const dateold = new Date(this.user.birthdate);
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

    getFullname() {
        return this.user.firstname + ' ' + this.user.lastname;
    }

    getAvatar() {
        if (this.user.avatar != null) {
            return `https://res.cloudinary.com/${environment.cloudinaryCloudName}/image/upload/` + this.user.avatar;
        } else if (this.user.loginFacebook && this.user.idFacebook) {
            return this.user.idFacebook;
        } else if (this.user.loginGoogle && this.user.idGoogle) {
            return this.user.idGoogle;
        } else {
            return 'assets/img/avatar_512.png';
        }
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
