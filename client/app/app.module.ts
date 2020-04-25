// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages';
import { SharedModule } from './shared';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
    imports: [
        AppRoutingModule,
        BrowserModule,
        PagesModule,
        SharedModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
