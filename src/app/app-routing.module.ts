import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from './_guards';

// components
import { HomeComponent } from './home/home.component';
import { HelpsComponent } from './helps/helps.component';
import { HelpsAddComponent } from './helps-add/helps-add.component';
import { HelpsDetailComponent } from './helps-detail/helps-detail.component';
import { HelpsEditComponent } from './helps-edit/helps-edit.component';
import { HelpsResponseComponent } from './helps-response/helps-response.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { FooterAboutComponent } from './footer-about/footer-about.component';
import { FooterContactComponent } from './footer-contact/footer-contact.component';
import { FooterFaqComponent } from './footer-faq/footer-faq.component';
import { FooterHowComponent } from './footer-how/footer-how.component';


const routes: Routes = [
  { path: 'about', component: FooterAboutComponent, data: {title: 'Chi siamo'}, canActivate: [AuthGuard] },
  { path: 'contact', component: FooterContactComponent, data: {title: 'Contattaci'}, canActivate: [AuthGuard] },
  { path: 'faq', component: FooterFaqComponent, data: {title: 'Domande frequenti'}, canActivate: [AuthGuard] },
  { path: 'how-it-works', component: FooterHowComponent, data: {title: 'Come funziona'}, canActivate: [AuthGuard] },
  { path: 'helps', component: HelpsComponent, data: {title: 'Lista aiuti'}, canActivate: [AuthGuard] },
  { path: 'helps/add', component: HelpsAddComponent, data: {title: 'Aggiungi aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/:id', component: HelpsDetailComponent,  data: {title: 'Dettagli aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/edit/:id', component: HelpsEditComponent,  data: {title: 'Modifica aiuto'}, canActivate: [AuthGuard] },
  { path: 'helps/response/:id', component: HelpsResponseComponent,  data: {title: 'Offri Aiuto'}, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
