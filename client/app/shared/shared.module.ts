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
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from 'angularx-social-login';
import {
    faAngleDoubleRight,
    faBell,
    faCamera, faCheck, faChevronLeft, faCircle, faClock, faCloudUploadAlt , faCoffee,
    faEnvelope,
    faHands,
    faHandPaper,
    faMapMarkerAlt,
    faPencilAlt, faPlus,
    faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
    faTrashAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
    faCheckSquare as farCheckSquare,
    faCircle as farCircle,
    faClipboard as farClipboard,
    faClock as farClock,
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

// social login configurations
const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    // provider prod
    // provider: new FacebookLoginProvider('220996429157029')

    // provider test
    provider: new FacebookLoginProvider('688443305245420')
  }
]);
export function provideConfig() {
  return config;
}

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

        SocialLoginModule
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
        { provide: AuthServiceConfig, useFactory: provideConfig },
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
            faHands, faHandPaper,
            faMapMarkerAlt,
            faPencilAlt, faPlus,
            faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
            faTrashAlt,
            faUsers,
            farCheckSquare, farCircle, farClipboard, farClock,
            farSquare,
            farStar);
    }
}
