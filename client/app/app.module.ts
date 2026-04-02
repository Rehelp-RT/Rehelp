// angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';




@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        CommonModule,
        PagesModule,
        SharedModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {
}
