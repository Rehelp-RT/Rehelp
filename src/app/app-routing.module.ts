import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// middlewares
import { AuthGuard } from './_guards';

// components
import { HomeComponent } from './home/home.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'data', component: DisplayUserDataComponent, canActivate: [AuthGuard] },
  { path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
