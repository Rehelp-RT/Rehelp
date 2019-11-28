import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DisplayUserDataComponent },
  { path: 'form', component: InputUserDataFormComponent },
  { path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
