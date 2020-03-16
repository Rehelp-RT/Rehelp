// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// third party modules
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// components
import { ChatComponent } from './chat.component';
import { UserIconModule } from '../user-icon';

@NgModule({
    declarations: [ChatComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        FontAwesomeModule,
        UserIconModule
    ],
    exports: [ChatComponent]
})
export class ChatModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faEnvelope);
    }
}
