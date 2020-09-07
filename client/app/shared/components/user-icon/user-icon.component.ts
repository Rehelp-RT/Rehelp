import {
    Component,
    Input,
    ViewEncapsulation,
    OnInit
} from '@angular/core';
import { User } from '@app/models';

@Component({
    selector: 'app-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class UserIconComponent implements OnInit {

    @Input() user: User;
    @Input() showAge: boolean = false;
    @Input() showLocation: boolean = false;
    @Input() showName: boolean = false;
    @Input() showRating: boolean = false;
    age: number;
    location: string;
    fullname: string;
    rating: number;

    constructor() { }

    ngOnInit(): void {
        if (this.showAge) this.age = this.getAge();
        if (this.showName) this.fullname = this.getFullname();
        if (this.showLocation) this.location = this.getLocation();
        if (this.showRating) this.rating = this.getRating();
    }

    getAge(): number {
        const datenew = new Date();
        const dateold = this.user.birthdate != null ? new Date(this.user.birthdate) : null;
        if (dateold != null) {
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
    }

    getAvatar(): string {
        if (this.user.avatar != null) {
            return 'https://res.cloudinary.com/hwbyvepex/image/upload/' + this.user.avatar;
        } else if (this.user.loginFacebook && this.user.idFacebook) {
            return this.user.idFacebook;
        } else if (this.user.loginGoogle && this.user.idGoogle) {
            return this.user.idGoogle;
        } else {
            return 'assets/img/avatar_64.png';
        }
    }

    getFullname(): string {
        return this.user.firstname + ' ' + this.user.lastname;
    }

    getLocation(): string {
        return this.user.city + ' ' + this.user.country;
    }

    getRating(): number {
        let count = 0;
        let sum = 0;
        if (this.user.helps != null && this.user.responses != null) {
          this.user.helps.forEach(h => {
            count++;
            sum += h.responses[0].ratingResponder;
          });
          this.user.responses.forEach(r => {
              count++;
              sum += r.ratingCreator;
          });
        }
        if (count == 0) {
            return null;
        } else {
            return sum / count;
        }
    }

}
