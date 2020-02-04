import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AlertComponent } from './alert/alert.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAddComponent } from './helps-add/helps-add.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { ProfileComponent } from './profile/profile.component';
import { HelpsDetailComponent } from './helps-detail/helps-detail.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { AboutComponent } from './about/about.component';
import { FaqComponent } from './faq/faq.component';
import { ContactComponent } from './contact/contact.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';

// fontawesome
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
  faAngleDoubleRight,
  faCheck,
  faPencilAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faSquare as farSquare,
  faCheckSquare as farCheckSquare
} from '@fortawesome/free-regular-svg-icons';
// import { faStackOverflow, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';

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
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(
      faAngleDoubleRight,
      faCheck,
      faPencilAlt,
      farSquare,
      farCheckSquare);
  }
}
