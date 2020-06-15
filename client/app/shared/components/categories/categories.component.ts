import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HelpCategory } from '@app/models';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

    @Input() category: HelpCategory;
    @Input() isCheckable: boolean = false;
    @Input() checked: boolean = false;

    constructor() { }

    ngOnInit() {
    }

    toggle() {
        if (this.isCheckable) {
            this.checked = !this.checked;
        }
    }

}
