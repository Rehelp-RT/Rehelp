import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AlertModule, ModalModule, UserIconModule } from './components';

import { FooterComponent, HeaderComponent } from './layout';

import { ErrorInterceptor, JwtInterceptor } from './interceptors';

import { FilterCategoriesPipe } from './pipes';

@NgModule({
    imports: [
        AlertModule, ModalModule, UserIconModule
    ],
    declarations: [
        HeaderComponent,
        FooterComponent,
        FilterCategoriesPipe
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
    exports: [
        AlertModule, ModalModule, UserIconModule,
        FooterComponent, HeaderComponent,
        FilterCategoriesPipe
    ]
})
export class SharedModule { }
