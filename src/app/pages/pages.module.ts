// librarie's modules
import { NgModule } from '@angular/core';

// page's modules and components
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAddComponent } from './helps-add/helps-add.component';
import { HelpsDetailComponent } from './helps-detail/helps-detail.component';
import { HelpsDetailResponsesComponent } from './helps-detail-responses/helps-detail-responses.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { MeetAndHelpComponent } from './meet-and-help/meet-and-help.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RegisterComponent } from './register/register.component';
import { StarRatingComponent } from './star-rating/star-rating.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

// routing
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
    imports: [
        PagesRoutingModule
    ],
    declarations: [
        AboutComponent,
        ContactComponent,
        FaqComponent,
        HelpsComponent,
        HelpsAddComponent,
        HelpsDetailComponent,
        HelpsDetailResponsesComponent,
        ProfileEditComponent,
        HelpsEditComponent,
        HelpsResponseComponent,
        HomeComponent,
        HowItWorksComponent,
        LoginComponent,
        MeetAndHelpComponent,
        ProfileComponent,
        ProfileEditComponent,
        RegisterComponent,
        StarRatingComponent,
        UploadAvatarComponent
    ],
    exports: [
        AboutComponent,
        ContactComponent,
        FaqComponent,
        HelpsComponent,
        HelpsAddComponent,
        HelpsDetailComponent,
        HelpsDetailResponsesComponent,
        ProfileEditComponent,
        HelpsEditComponent,
        HelpsResponseComponent,
        HomeComponent,
        HowItWorksComponent,
        LoginComponent,
        MeetAndHelpComponent,
        ProfileComponent,
        ProfileEditComponent,
        RegisterComponent,
        StarRatingComponent,
        UploadAvatarComponent
    ]
})
export class PagesModule { }
