import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { LoadingComponent } from './loading.component';

@NgModule({
    imports: [CommonModule, FontAwesomeModule],
    declarations: [LoadingComponent],
    exports: [LoadingComponent]
})
export class LoadingModule { }
