// core modules
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';

// app modules
import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '@app/shared';

// page modules
import { HelpsDetailModule } from './helps-detail';
import { ProfileModule } from './profile';
import { UsersModule } from './users/users.module';

// page components
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAskComponent } from './helps-ask/helps-ask.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { RegisterComponent } from './register/register.component';
import { BachecaComponent } from './bacheca/bacheca.component';
import { ForumComponent } from './forum/forum.component';
import { ForumDetailComponent } from './forum-detail/forum-detail.component';
import { ForumPostComponent } from './forum-post/forum-post.component';
import { WalletComponent } from './wallet/wallet.component';
import { ForumFormComponent } from './forum-form/forum-form.component';
import { CommentComponent } from './comment/comment.component';
import { BachecaFormComponent } from './bacheca-form/bacheca-form.component';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        FormsModule,
        HttpClientModule,
        MatSliderModule,
        ReactiveFormsModule,
        RouterModule,

        HelpsDetailModule,
        ProfileModule,
        UsersModule,

        PagesRoutingModule,
        SharedModule
    ],
    declarations: [
        AboutComponent,
        ContactComponent,
        FaqComponent,
        HelpsComponent,
        HelpsAskComponent,
        HelpsEditComponent,
        HelpsResponseComponent,
        HomeComponent,
        HowItWorksComponent,
        LoginComponent,
        PasswordRecoveryComponent,
        PasswordResetComponent,
        PrivacyComponent,
        RegisterComponent,
        BachecaComponent,
        ForumComponent,
        ForumDetailComponent,
        ForumPostComponent,
        WalletComponent,
        ForumFormComponent,
        CommentComponent,
        BachecaFormComponent
    ],
    exports: []
})
export class PagesModule { }
