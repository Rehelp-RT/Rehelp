import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from './_guards';

// components
import { HomeComponent } from './home/home.component';
import { HelpsComponent } from './helps/helps.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  { path: 'helps', component: HelpsComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
