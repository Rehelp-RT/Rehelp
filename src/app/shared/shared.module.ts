import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faAngleDoubleRight,
    faCamera, faCheck, faChevronLeft, faCircle, faCloudUploadAlt, faCoffee,
    faEnvelope,
    faMapMarkerAlt,
    faPencilAlt, faPlus,
    faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faCheckSquare as farCheckSquare,
    faClipboard as farClipboard,
    faSquare as farSquare,
    faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

import { AlertModule, ModalModule, UserIconModule } from './components';

import { FooterComponent, HeaderComponent } from './layout';

import { ErrorInterceptor, JwtInterceptor } from './interceptors';

import { FilterCategoriesPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FontAwesomeModule,
        AlertModule, ModalModule, UserIconModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        FilterCategoriesPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    exports: [
        FontAwesomeModule,
        AlertModule, ModalModule, UserIconModule,
        FooterComponent, HeaderComponent,
        FilterCategoriesPipe
    ]
})
export class SharedModule {

  constructor(private library: FaIconLibrary) {
    library.addIcons(
        faAngleDoubleRight,
        faCamera, faCircle, faCheck, faChevronLeft, faCloudUploadAlt, faCoffee,
        faEnvelope,
        faMapMarkerAlt,
        faPencilAlt, faPlus,
        faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
        faTrashAlt,
        farCheckSquare, farClipboard,
        farSquare,
        farStar);
}
}
