import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/components';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        // const now = moment();
        // console.log('now', now.format());
        // const nowUtc = now.utc();
        // console.log('nowUtc', nowUtc.format());

        // const date = moment('2020-06-16 13:00:00.000+00');
        // console.log('date', date.format());
        // const dateUtc = date.utc();
        // console.log('dateUtc', dateUtc.format());

        // const distance = date.fromNow();
        // console.log('distance', distance);
        // const ms = now.diff(date);
        // console.log('ms', ms);
        // const difference = moment.duration(ms);

        // console.log('difference.days', difference.days());
        // console.log('difference.hours', difference.hours());
        // console.log('difference.minutes', difference.minutes());
        // console.log('difference.seconds', difference.seconds());
    }
}
