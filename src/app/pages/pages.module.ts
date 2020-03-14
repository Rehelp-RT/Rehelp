// library modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HelpsDetailModule } from './helps-detail';
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@app/shared';

import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAddComponent } from './helps-add/helps-add.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { MeetAndHelpComponent } from './meet-and-help/meet-and-help.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RegisterComponent } from './register/register.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule, RouterModule,

        HelpsDetailModule,
        PagesRoutingModule,
        SharedModule
    ],
    declarations: [
        AboutComponent,
        ContactComponent,
        FaqComponent,
        HelpsComponent,
        HelpsAddComponent,
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
        UploadAvatarComponent
    ],
    exports: []
})
export class PagesModule { }
