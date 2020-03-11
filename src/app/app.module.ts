import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule, CloudinaryConfiguration, provideCloudinary } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
import { AppRoutingModule } from './app-routing.module';

import { AlertModule } from './_alert';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { ModalModule } from './_modal';

// components
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { AlertComponent } from './alert/alert.component';
import { ContactComponent } from './contact/contact.component';
import { HeaderComponent } from './header/header.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAddComponent } from './helps-add/helps-add.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsDetailComponent } from './helps-detail/helps-detail.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { FaqComponent } from './faq/faq.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { TestUploadComponent } from './test-upload/test-upload.component';


// fontawesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleRight,
  faCamera,
  faCheck,
  faChevronLeft,
  faCircle,
  faCloudUploadAlt,
  faCoffee,
  faEnvelope,
  faMapMarkerAlt,
  faPencilAlt,
  faPlus,
  faSave,
  faSpinner,
  faSquare,
  faStar,
  faStarOfLife,
  faSync,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faCheckSquare as farCheckSquare,
  faClipboard as farClipboard,
  faSquare as farSquare,
  faStar as farStar
} from '@fortawesome/free-regular-svg-icons';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { MeetAndHelpComponent } from './meet-and-help/meet-and-help.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { FilterCategoriesPipe } from './filter-categories.pipe';
import { HelpsDetailResponsesComponent } from './helps-detail-responses/helps-detail-responses.component';
import { UserIconComponent } from './user-icon/user-icon.component';
// import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

export const cloudinaryLib = { Cloudinary: CloudinaryCore };

@NgModule({
  declarations: [
    AboutComponent,
    AlertComponent,
    AppComponent,
    ContactComponent,
    FaqComponent,
    FooterComponent,
    HeaderComponent,
    HelpsComponent,
    HelpsAddComponent,
    HelpsDetailComponent,
    HelpsEditComponent,
    HelpsResponseComponent,
    HomeComponent,
    HowItWorksComponent,
    LoginComponent,
    MeetAndHelpComponent,
    ProfileEditComponent,
    ProfileComponent,
    RegisterComponent,
    StarRatingComponent,
    TestUploadComponent,
    UploadAvatarComponent,
    FilterCategoriesPipe,
    HelpsDetailResponsesComponent,
    UserIconComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    FormsModule,
    ModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
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
    FileUploadModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faAngleDoubleRight,
      faCamera,
      faCircle,
      faCheck,
      faChevronLeft,
      faCloudUploadAlt,
      faCoffee,
      faEnvelope,
      faMapMarkerAlt,
      faPencilAlt,
      faPlus,
      faSave,
      faSpinner,
      faSquare,
      faStar,
      faStarOfLife,
      faSync,
      faTrashAlt,
      farCheckSquare,
      farClipboard,
      farSquare,
      farStar);
  }
}
