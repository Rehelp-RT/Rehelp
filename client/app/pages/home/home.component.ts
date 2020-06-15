import { Component, OnInit } from '@angular/core';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from '@app/shared/components';
import * as moment from 'moment';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
        const now = moment(Date());
        console.log(now);
        // const then = moment(date);
        // console.log('date', date);
        // const timespan = now.diff(then);
        // console.log('timespan', timespan);
        // if (timespan < 0) {
        //     return 'scaduto';
        // } else {
        //     const resultDate = moment.utc(timespan);
        //     const result = resultDate.format('HH') + ' ore ' + resultDate.format('mm') + ' minuti';
        //     console.log('result', result);
        //     return result;
        // }
    }
}
