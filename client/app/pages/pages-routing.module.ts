import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from '@app/guards';

// pages
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAskComponent } from './helps-ask/helps-ask.component';
import { HelpsDetailComponent } from './helps-detail/helps-detail.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { HomeComponent } from './home/home.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { LoginComponent } from './login/login.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, data: {title: 'Chi siamo'} },
  { path: 'contact', component: ContactComponent, data: {title: 'Contattaci'} },
  { path: 'faq', component: FaqComponent, data: {title: 'Domande frequenti'} },
  { path: 'how-it-works', component: HowItWorksComponent, data: {title: 'Come funziona'} },
  { path: 'helps', component: HelpsComponent, data: {title: 'Lista aiuti'}, canActivate: [AuthGuard] },
  { path: 'helps/add/:type', component: HelpsEditComponent, data: {title: 'Nuovo aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/add', component: HelpsEditComponent, data: {title: 'Nuovo aiuto'}, canActivate: [AuthGuard], pathMatch: 'full' },
  { path: 'helps/ask/:id', component: HelpsAskComponent, data: {title: 'Chiedi aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/:id', component: HelpsDetailComponent,  data: {title: 'Dettagli aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/edit/:id', component: HelpsEditComponent,  data: {title: 'Modifica aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/:id/response', component: HelpsResponseComponent,  data: {title: 'Offri Aiuto'}, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // { path: 'meet-and-help', component: MeetAndHelpComponent, canActivate: [AuthGuard] },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
