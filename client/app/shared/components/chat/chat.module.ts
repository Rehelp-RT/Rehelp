// angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

// third party modules
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faPaperclip, faXmark } from '@fortawesome/free-solid-svg-icons';

// components
import { ChatComponent } from './chat.component';
import { UserIconModule } from '../user-icon';

@NgModule({ declarations: [ChatComponent],
    exports: [ChatComponent], imports: [CommonModule,
        FormsModule,
        FontAwesomeModule,
        UserIconModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ChatModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faEnvelope, faPaperclip, faXmark);
    }
}
