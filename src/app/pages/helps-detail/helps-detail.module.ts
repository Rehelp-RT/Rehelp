import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HelpsDetailComponent } from './helps-detail.component';
import { HelpsDetailResponsesComponent } from './helps-detail-responses';
import { SharedModule } from '@app/shared';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [ HelpsDetailComponent, HelpsDetailResponsesComponent ],
    exports: [ HelpsDetailComponent, HelpsDetailResponsesComponent ]
})
export class HelpsDetailModule { }
