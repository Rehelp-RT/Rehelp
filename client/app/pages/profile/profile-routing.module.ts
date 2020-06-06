import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from '@app/guards';

// pages
import { ProfileComponent } from './profile.component';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { PasswordEditComponent } from './password-edit/password-edit.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

const routes: Routes = [{
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
        { path: 'detail', component: ProfileDetailComponent, canActivate: [AuthGuard] },
        { path: 'edit', component: ProfileEditComponent,  data: {title: 'Modifica dati personali'}, canActivate: [AuthGuard] },
        { path: 'password-edit', component: PasswordEditComponent,  data: {title: 'Modifica della password'}, canActivate: [AuthGuard] },
        { path: 'upload-avatar', component: UploadAvatarComponent, data: {title: 'Upload avatar'}, canActivate: [AuthGuard] },
        { path: '', pathMatch: 'full', redirectTo: 'detail' }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule { }
