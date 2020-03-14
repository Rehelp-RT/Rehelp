// library modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

// third party modules
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
export const cloudinaryLib = { Cloudinary: CloudinaryCore };

// app modules
import { SharedModule } from '@app/shared';
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
        CommonModule,
        FileUploadModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule, RouterModule,

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

        PagesRoutingModule,
        SharedModule
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
    providers: [
        GoogleMapsAPIWrapper
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
