import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { ChatService } from './chat.service';
import { throttleTime, distinctUntilChanged } from 'rxjs/operators';
import * as moment from 'moment';

import { Help, HelpResponse, Message } from '@app/models';
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
    currentUser = null;
    isOpen = false;
    private subscription = null;

    constructor(private chatService: ChatService, private authService: AuthenticationService) { }

    ngOnInit() {
        this.currentUser = this.authService.currentUserValue;
        this.subscription =
            this.chatService.getMessages()
            .pipe(distinctUntilChanged())
            .pipe(throttleTime(200))
            .subscribe((message) => {
                // const currentTime = moment().format('HH:mm:ss');
                // const messageWithTimestamp =  `${currentTime}: ${message}`;
                this.messages.push(message);
                this.scrollToBottom();
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
