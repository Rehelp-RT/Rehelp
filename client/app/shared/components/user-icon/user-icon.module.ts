import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import { UserIconComponent } from './user-icon.component';

@NgModule({
    imports: [ CommonModule, RouterModule, FontAwesomeModule ],
    declarations: [ UserIconComponent ],
    exports: [ UserIconComponent ]
})
export class UserIconModule {
    constructor(private library: FaIconLibrary) {
        this.library.addIcons(faStar);
    }
}
