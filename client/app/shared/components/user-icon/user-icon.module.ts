import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserIconComponent } from './user-icon.component';

@NgModule({
    imports: [ CommonModule, RouterModule ],
    declarations: [ UserIconComponent ],
    exports: [ UserIconComponent ]
})
export class UserIconModule { }
