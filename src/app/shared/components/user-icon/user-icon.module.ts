import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserIconComponent } from './user-icon.component';

@NgModule({
    imports: [ CommonModule ],
    declarations: [ UserIconComponent ],
    exports: [ UserIconComponent ]
})
export class UserIconModule { }
