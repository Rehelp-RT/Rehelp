import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from '@app/guards';

// pages
import { ProfileComponent } from './profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { RequestedHelpComponent } from './requested-help/requested-help.component';
import { OfferComponent } from './offer/offer.component';
import { OfferedHelpComponent } from './offered-help/offered-help.component';
import { UploadAvatarComponent } from './upload-avatar/upload-avatar.component';

const routes: Routes = [
  {
    path: 'profile/:id',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'edit', component: ProfileEditComponent,  data: {title: 'Modifica dati personali'}, canActivate: [AuthGuard] },
      { path: 'offer', component: OfferComponent, data: {title: 'Offerta'}, canActivate: [AuthGuard] },
      { path: 'offered-help', component: OfferedHelpComponent, data: {title: 'Aiuti offerti'}, canActivate: [AuthGuard] },
      { path: 'requested-help', component: RequestedHelpComponent, data: {title: 'Aiuti richiesti'}, canActivate: [AuthGuard] },
      { path: 'upload-avatar', component: UploadAvatarComponent, data: {title: 'Upload avatar'}, canActivate: [AuthGuard] },
      { path: '', pathMatch: 'full', redirectTo: 'offer' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
