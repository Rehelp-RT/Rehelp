import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    message = '';
    messages = [];

    constructor(private chatService: ChatService) { }

    ngOnInit() {
        this.chatService.getMessages().subscribe((message: string) => {
            this.messages.push(message);
        });
    }

    onKeyDown(event) {
        event.preventDefault();
    }

    sendMessage() {
        this.chatService.sendMessage(this.message);
        this.message = '';
    }

}
