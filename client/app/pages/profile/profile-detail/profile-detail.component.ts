import { Component, OnInit } from '@angular/core';

import { RequestedHelpComponent } from '../requested-help/requested-help.component';
import { OfferComponent } from '../offer/offer.component';
import { OfferedHelpComponent } from '../offered-help/offered-help.component';

@Component({
    selector: 'app-profile-detail',
    templateUrl: './profile-detail.component.html',
    styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
