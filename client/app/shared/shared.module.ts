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
import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import {
    faAngleDoubleRight,
    faBell,
    faCamera, faCheck, faChevronLeft, faCircle, faClock, faCloudUploadAlt , faCoffee,
    faEnvelope,
    faHands,
    faHandPaper,
    faImage,
    faKey,
    faMapMarkerAlt,
    faPencilAlt, faFilePdf, faPlus,
    faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
    faTrashAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import {
    faCheckSquare as farCheckSquare,
    faCircle as farCircle,
    faClipboard as farClipboard,
    faClock as farClock,
    faComment as farComment,
    faSquare as farSquare,
    faStar as farStar
} from '@fortawesome/free-regular-svg-icons';
import {
  faFacebook,
  faGoogle
} from '@fortawesome/free-brands-svg-icons';
import { RecaptchaModule, RecaptchaFormsModule, RECAPTCHA_SETTINGS, RECAPTCHA_LANGUAGE, RecaptchaSettings } from 'ng-recaptcha';

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
import { HelpTypeComponent } from './components/help-type/help-type.component';

// social login configurations
const config = new AuthServiceConfig([
    {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider('777650088501-7v0eembic12t9esbnht9lmmhi95tho4j.apps.googleusercontent.com')
    },
    {
        id: FacebookLoginProvider.PROVIDER_ID,
        // provider prod
        provider: new FacebookLoginProvider('220996429157029')

        // provider test
        // provider: new FacebookLoginProvider('688443305245420')
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

        RecaptchaModule, RecaptchaFormsModule,
        SocialLoginModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        FilterCategoriesPipe,
        HelpTypeComponent,
        NotificationsComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: AuthServiceConfig, useFactory: provideConfig },
        {
          provide: RECAPTCHA_SETTINGS,
          useValue: { siteKey: '6LfzDvEUAAAAAAnUqnwbuaadUCj6mWivJIjHOwJx'} as RecaptchaSettings,
        },
        { provide: RECAPTCHA_LANGUAGE, useValue: 'it'},
        GoogleMapsAPIWrapper
    ],
    exports: [
        AgmCoreModule,
        FontAwesomeModule,
        AlertModule, CategoriesModule, ChatModule,
        HelpTypeComponent,
        ModalModule, StarRatingModule, StarsModule, UserIconModule,
        FooterComponent, HeaderComponent,
        RecaptchaModule, RecaptchaFormsModule,
        FilterCategoriesPipe
    ]
})
export class SharedModule {

    constructor(private library: FaIconLibrary) {
        this.library.addIcons(
            faAngleDoubleRight, faBell,
            faCamera, faCircle, faCheck, faChevronLeft, faClock, faCloudUploadAlt, faCoffee,
            faEnvelope, faFacebook, faGoogle,
            faHands, faHandPaper, faImage, faKey,
            faMapMarkerAlt, faPencilAlt, faFilePdf, faPlus,
            faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
            faTrashAlt, faUsers,
            
            farCheckSquare, farCircle, farClipboard, farClock, farComment,
            farSquare, farStar);
    }
}
