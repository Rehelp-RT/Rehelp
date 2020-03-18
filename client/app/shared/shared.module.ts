// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// third party modules
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
export const cloudinaryLib = { Cloudinary: CloudinaryCore };
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faAngleDoubleRight,
    faBell,
    faCamera, faCheck, faChevronLeft, faCircle, faClock, faCloudUploadAlt , faCoffee,
    faEnvelope,
    faMapMarkerAlt,
    faPencilAlt, faPlus,
    faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faCheckSquare as farCheckSquare,
    faCircle as farCircle,
    faClipboard as farClipboard,
    faSquare as farSquare,
    faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

// app module
import {
    AlertModule,
    CategoriesModule,
    ChatModule,
    ModalModule,
    StarRatingModule,
    StarsModule,
    UserIconModule
} from './components';

// app layout
import { FooterComponent, HeaderComponent } from './layout';

// app interceptors
import { ErrorInterceptor, JwtInterceptor } from './interceptors';

// app pipes
import { FilterCategoriesPipe } from './pipes';
import { NotificationsComponent } from './layout/header/notifications/notifications.component';

@NgModule({
    imports: [
        CommonModule, FileUploadModule, FormsModule, ReactiveFormsModule, RouterModule,

        FontAwesomeModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAbbsrna-196ECj0O-Gc2-BWQcT5IfVj-8',
            libraries: ['places']
        }),
        CloudinaryModule.forRoot(cloudinaryLib, {
            cloud_name: 'hwbyvepex',
            api_key: '179729361229299',
            api_secret: 'bvVksVM28wciVB6_e2GG-dne3bI',
            upload_preset: 'preset_avatar'
        }),

        AlertModule, CategoriesModule, ChatModule,
        ModalModule, StarRatingModule, StarsModule, UserIconModule,
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        FilterCategoriesPipe,
        NotificationsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        GoogleMapsAPIWrapper
    ],
    exports: [
        AgmCoreModule,
        FontAwesomeModule,
        AlertModule, CategoriesModule, ChatModule,
        ModalModule, StarRatingModule, StarsModule, UserIconModule,
        FooterComponent, HeaderComponent,
        FilterCategoriesPipe
    ]
})
export class SharedModule {

    constructor(private library: FaIconLibrary) {
        library.addIcons(
            faAngleDoubleRight,
            faBell,
            faCamera, faCircle, faCheck, faChevronLeft, faClock, faCloudUploadAlt, faCoffee,
            faEnvelope,
            faMapMarkerAlt,
            faPencilAlt, faPlus,
            faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
            faTrashAlt,
            farCheckSquare, farCircle, farClipboard,
            farSquare,
            farStar);
    }
}
