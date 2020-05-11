import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileRoutingModule } from './profile-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { SharedModule } from '@app/shared';

import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { RequestedHelpComponent } from './requested-help/requested-help.component';
import { OfferComponent } from './offer/offer.component';
import { OfferedHelpComponent } from './offered-help/offered-help.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';
import { CategoriesEditComponent } from './offer/categories-edit/categories-edit.component';

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
        FormsModule,
        ProfileRoutingModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule
    ],
    declarations: [
        CategoriesEditComponent,
        ProfileComponent,
        ProfileEditComponent,
        PasswordEditComponent,
        OfferComponent,
        OfferedHelpComponent,
        RequestedHelpComponent,
        UploadAvatarComponent
    ],
    exports: [
        ProfileComponent,
        CategoriesEditComponent
    ]
})
export class ProfileModule { }
