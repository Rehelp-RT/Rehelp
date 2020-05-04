import {
    Component,
    OnInit,
    Input,
    ViewEncapsulation
} from '@angular/core';
import { User } from '@app/models';

@Component({
    selector: 'app-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class UserIconComponent implements OnInit {

    @Input() user: User;
    @Input() showName: boolean = true;

    constructor() { }

    ngOnInit() {
        console.log(this.showName);
    }

    getFullname() {
        return this.user.firstname + ' ' + this.user.lastname;
    }

    getAvatar() {
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

}
