import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';

import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { RequestedHelpComponent } from './requested-help/requested-help.component';
import { OfferComponent } from './offer/offer.component';
import { OfferedHelpComponent } from './offered-help/offered-help.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        FileUploadModule,
        NgbModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        ProfileComponent,
        ProfileDetailComponent,
        ProfileEditComponent,
        PasswordEditComponent,
        OfferComponent,
        OfferedHelpComponent,
        RequestedHelpComponent,
        UploadAvatarComponent
    ],
    exports: [
        ProfileComponent
    ]
})
export class ProfileModule { }
