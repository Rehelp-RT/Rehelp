import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { HelpCategory } from '@app/models';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {

    @Input() category: HelpCategory;

    constructor() { }

    ngOnInit() {
    }

}
