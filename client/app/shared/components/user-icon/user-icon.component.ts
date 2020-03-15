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

    constructor() { }

    ngOnInit() {
    }

}
