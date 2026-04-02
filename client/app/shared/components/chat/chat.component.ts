import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from './chat.service';
import { distinctUntilChanged } from 'rxjs/operators';

import { Help, HelpResponse, Message, User } from '@app/models';
import { AuthenticationService } from '@app/services';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss'],
    standalone: false
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {
    @ViewChild('scrollMe') private scrolly: ElementRef;
    @Input() help: Help;
    @Input() response: HelpResponse;
    @Input() isCreator: boolean;
    messageBody = '';
    messages: Message[] = [];
    currentUser: User = null;
    isOpen = false;
    private subscription = null;

    constructor(
        private authService: AuthenticationService,
        private chatService: ChatService) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;

        this.chatService.getAll(this.help.id).subscribe(x => {
            // saved message
            this.messages = x;

            // listen on incoming message
            this.subscription =
                this.chatService.getMessages()
                .pipe(distinctUntilChanged())
                .subscribe((message) => {
                    if (message.idHelp === this.help.id) {
                        this.messages.push(message);
                        this.scrollToBottom();
                    }
                });
        });
    }

    openChat() {
        this.isOpen = true
        this.scrollToBottom();
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    onKeyDown(event) {
        event.preventDefault();
    }

    sendMessage() {
        if (this.messageBody.trim().length > 0) {
            this.chatService.sendMessage(this.messageBody, this.help.id, this.currentUser.id);
            this.messageBody = '';
        }
    }

    scrollToBottom(): void {
        try {
            this.scrolly.nativeElement.scrollTop = this.scrolly.nativeElement.scrollHeight;
        } catch (err) { }
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
