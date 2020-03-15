import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ChatComponent } from './chat.component';

@NgModule({
    declarations: [ChatComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule
    ],
    exports: [ChatComponent]
})
export class ChatModule { }
