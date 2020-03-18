import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from './chat.service';
import { distinctUntilChanged } from 'rxjs/operators';

import { Help, HelpResponse, Message, User } from '@app/models';
import { AuthenticationService } from '@app/services';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('scrollMe', {static: false}) private scrolly: ElementRef;
    @Input() help: Help;
    @Input() response: HelpResponse;
    @Input() isCreator: boolean;
    messageBody = '';
    messages: Message[] = [];
    otherUser: User = null;
    currentUser: User = null;
    isOpen = false;
    private subscription = null;

    constructor(
        private authService: AuthenticationService,
        private chatService: ChatService) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        this.otherUser = this.isCreator ? this.response.responder : this.help.creator;
        console.log('currentUser', this.currentUser);
        console.log('otherUser', this.otherUser);

        this.chatService.getAll(this.response.id).subscribe(x => {
            // saved message
            this.messages = x;
            console.log('messages', this.messages);

            // listen on incoming message
            this.subscription =
                this.chatService.getMessages()
                .pipe(distinctUntilChanged())
                .subscribe((message) => {
                    // const currentTime = moment().format('HH:mm:ss');
                    // const messageWithTimestamp =  `${currentTime}: ${message}`;
                    if (message.idResponse == this.response.id) {
                        this.messages.push(message);
                        console.log('messages', this.messages);
                        this.scrollToBottom();
                    }
                });
        });
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    onKeyDown(event) {
        event.preventDefault();
    }

    sendMessage() {
        if (this.messageBody.trim().length > 0) {
            this.chatService.sendMessage(this.messageBody, this.response.id, this.currentUser.id);
            this.messageBody = '';
        }
    }

    scrollToBottom(): void {
        try {
            this.scrolly.nativeElement.scrollTop = this.scrolly.nativeElement.scrollHeight;
        } catch (err) { }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}
