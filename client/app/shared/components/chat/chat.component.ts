import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewChecked, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChatService } from './chat.service';
import { distinctUntilChanged } from 'rxjs/operators';
import { environment } from '@environments/environment';

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
    imagePreviewUrl: string = null;
    uploadedImageUrl: string = null;
    uploading = false;
    private subscription = null;

    constructor(
        private authService: AuthenticationService,
        private chatService: ChatService,
        private http: HttpClient) { }

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
        if (this.uploading) return;
        const body = this.messageBody.trim();
        if (body.length > 0 || this.uploadedImageUrl) {
            this.chatService.sendMessage(body, this.help.id, this.currentUser.id, undefined, this.uploadedImageUrl);
            this.messageBody = '';
            this.removeSelectedImage();
        }
    }

    onFileSelected(event: Event) {
        const file = (event.target as HTMLInputElement).files[0];
        (event.target as HTMLInputElement).value = '';
        if (!file || !file.type.startsWith('image/')) return;

        this.imagePreviewUrl = URL.createObjectURL(file);
        this.uploadedImageUrl = null;

        const formData = new FormData();
        formData.append('upload_preset', environment.cloudinaryHelpPreset);
        formData.append('folder', 'chat');
        formData.append('file', file);

        this.uploading = true;
        this.http.post(`https://api.cloudinary.com/v1_1/${environment.cloudinaryCloudName}/upload`, formData).subscribe(
            (response: any) => {
                this.uploading = false;
                this.uploadedImageUrl = response.secure_url;
            },
            err => {
                this.uploading = false;
                this.removeSelectedImage();
                console.error(err);
            }
        );
    }

    removeSelectedImage() {
        if (this.imagePreviewUrl) {
            URL.revokeObjectURL(this.imagePreviewUrl);
        }
        this.imagePreviewUrl = null;
        this.uploadedImageUrl = null;
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
