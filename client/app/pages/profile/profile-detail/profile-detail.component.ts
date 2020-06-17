import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { RequestedHelpComponent } from '../requested-help/requested-help.component';
import { OfferComponent } from '../offer/offer.component';
import { OfferedHelpComponent } from '../offered-help/offered-help.component';
import { AuthenticationService, UserService } from '@app/services';
import { User } from '@app/models';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

    idUser: number;
    isOwner: boolean;
    user: User;

    constructor(
        private route: ActivatedRoute,
        private authService: AuthenticationService,
        private userService: UserService) { }

    ngOnInit(): void {
        this.route.parent.params.subscribe(params => {
            // console.log('currentUser', this.authService.currentUserValue)
            this.idUser = params.id;
            this.isOwner = this.authService.currentUserValue.id == this.idUser;
            this.loadUser();
        });
    }

    private loadUser() {
        if (this.isOwner) {
            this.user = this.authService.currentUserValue;
        } else {
            this.userService.getById(this.idUser).subscribe(x => {
                this.user = x;
            });
        }
    }

}
