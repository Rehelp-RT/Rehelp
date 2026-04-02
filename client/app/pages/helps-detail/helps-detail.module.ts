import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HelpsDetailComponent } from './helps-detail.component';
import { HelpsDetailResponsesComponent } from './helps-detail-responses';
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [ HelpsDetailComponent, HelpsDetailResponsesComponent ],
    exports: [ HelpsDetailComponent, HelpsDetailResponsesComponent ]
})
export class HelpsDetailModule { }
