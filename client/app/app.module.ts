// angular modules
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocialLoginModule, SocialAuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider } from '@abacritt/angularx-social-login';


@NgModule({ declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent], imports: [AppRoutingModule,
        CommonModule,
        SharedModule,
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        SocialLoginModule],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    { id: GoogleLoginProvider.PROVIDER_ID, provider: new GoogleLoginProvider('777650088501-7v0eembic12t9esbnht9lmmhi95tho4j.apps.googleusercontent.com') },
                    { id: FacebookLoginProvider.PROVIDER_ID, provider: new FacebookLoginProvider('220996429157029') }
                ]
            } as SocialAuthServiceConfig
        }
    ] })
export class AppModule {
}
