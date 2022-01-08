// angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BachecaComponent } from './bacheca/bacheca.component';

@NgModule({
    imports: [
        AppRoutingModule,
        CommonModule,
        PagesModule,
        SharedModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent,
        BachecaComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {
}
