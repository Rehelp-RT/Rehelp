// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages';
import { SharedModule } from './shared';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        PagesModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
