// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// third party modules
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';
import {
  faAngleDoubleRight,
  faBell,
  faCamera, faCheck, faChevronLeft, faCircle, faClock, faCloudUploadAlt , faCoffee,
  faEnvelope,
  faHands,
  faHand,
  faHeart,
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
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule,

    FontAwesomeModule,
    GoogleMapsModule,

    AlertModule, CategoriesModule, ChatModule,
    ModalModule, StarRatingModule, StarsModule, UserIconModule,

    SocialLoginModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    FilterCategoriesPipe,
    HelpTypeComponent,
    NotificationsComponent,
    FilterPipe
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('777650088501-7v0eembic12t9esbnht9lmmhi95tho4j.apps.googleusercontent.com') },
          { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('220996429157029') }
        ]
      } as SocialAuthServiceConfig
    }
  ],
  exports: [
    GoogleMapsModule,
    FontAwesomeModule,
    AlertModule, CategoriesModule, ChatModule,
    HelpTypeComponent,
    ModalModule, StarRatingModule, StarsModule, UserIconModule,
    FooterComponent, HeaderComponent,
    FilterCategoriesPipe,
    FilterPipe
  ]
})
export class SharedModule {

  constructor(private library: FaIconLibrary) {
    this.library.addIcons(
      faAngleDoubleRight, faBell,
      faCamera, faCircle, faCheck, faChevronLeft, faClock, faCloudUploadAlt, faCoffee,
      faEnvelope, faFacebook, faGoogle,
      faHands, faHand, faHeart, faImage, faKey,
      faMapMarkerAlt, faPencilAlt, faFilePdf, faPlus,
      faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
      faTrashAlt, faUsers,

      farCheckSquare, farCircle, farClipboard, farClock, farComment,
      farSquare, farStar);
  }
}
