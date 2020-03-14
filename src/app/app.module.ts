// angular modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// third party modules
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary as CloudinaryCore } from 'cloudinary-core';
export const cloudinaryLib = { Cloudinary: CloudinaryCore };
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import {
    faAngleDoubleRight,
    faCamera, faCheck, faChevronLeft, faCircle, faCloudUploadAlt, faCoffee,
    faEnvelope,
    faMapMarkerAlt,
    faPencilAlt, faPlus,
    faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
    faTrashAlt
} from '@fortawesome/free-solid-svg-icons';
import {
    faCheckSquare as farCheckSquare,
    faClipboard as farClipboard,
    faSquare as farSquare,
    faStar as farStar
} from '@fortawesome/free-regular-svg-icons';

// app modules and components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages';
import { SharedModule } from './shared';

@NgModule({
    imports: [
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAbbsrna-196ECj0O-Gc2-BWQcT5IfVj-8',
            libraries: ['places']
        }),
        AppRoutingModule,
        BrowserModule,
        CloudinaryModule.forRoot(cloudinaryLib, {
            cloud_name: 'hwbyvepex',
            api_key: '179729361229299',
            api_secret: 'bvVksVM28wciVB6_e2GG-dne3bI',
            upload_preset: 'preset_avatar'
        }),
        FileUploadModule,
        FontAwesomeModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,

        PagesModule,
        SharedModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        GoogleMapsAPIWrapper
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(
            faAngleDoubleRight,
            faCamera, faCircle, faCheck, faChevronLeft, faCloudUploadAlt, faCoffee,
            faEnvelope,
            faMapMarkerAlt,
            faPencilAlt, faPlus,
            faSave, faSpinner, faSquare, faStar, faStarOfLife, faSync,
            faTrashAlt,
            farCheckSquare, farClipboard,
            farSquare,
            farStar);
    }
}
