import { Component, Input } from '@angular/core';
import { HelpType } from '@app/models';

@Component({
    selector: 'app-help-type',
    templateUrl: './help-type.component.html',
    styleUrls: ['./help-type.component.css'],
    standalone: false
})
export class HelpTypeComponent {

    @Input() type: HelpType;
    
    constructor() { }

    getFaIcon() {
        if (this.type.code === 'MEH') {
            return 'hands';
        } else if (this.type.code == 'IMH') {
            return 'clock';
        } else if (this.type.code == 'COH') {
            return 'users';
        } else if (this.type.code == 'MES') {
            return 'sync';
        } else {
            return ''
        }
    }

}
