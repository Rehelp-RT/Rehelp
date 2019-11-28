import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputUserDataFormComponent } from './input-user-data-form/input-user-data-form.component';
import { DisplayUserDataComponent } from './display-user-data/display-user-data.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';

@NgModule({
  declarations: [
    AppComponent,
    InputUserDataFormComponent,
    DisplayUserDataComponent,
    HomeComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
