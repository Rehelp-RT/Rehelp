import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { authGuard } from '@app/guards';

// pages
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

const routes: Routes = [{
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [authGuard],
    children: [
        { path: 'detail', component: ProfileDetailComponent, canActivate: [authGuard] },
        { path: 'edit', component: ProfileEditComponent,  data: {title: 'Modifica dati personali'}, canActivate: [authGuard] },
        { path: 'password-edit', component: PasswordEditComponent,  data: {title: 'Modifica della password'}, canActivate: [authGuard] },
        { path: 'upload-avatar', component: UploadAvatarComponent, data: {title: 'Upload avatar'}, canActivate: [authGuard] },
        { path: '', pathMatch: 'full', redirectTo: 'detail' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
