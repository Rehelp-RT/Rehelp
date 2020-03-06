import { Component, OnInit, Input } from '@angular/core';
import { User } from '@app/_models';

@Component({
    selector: 'app-user-icon',
    templateUrl: './user-icon.component.html',
    styleUrls: ['./user-icon.component.css']
})
export class UserIconComponent implements OnInit {

    @Input() user: User;

    constructor() { }

    ngOnInit() {
    }

}
