import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';
import { Message } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket;

    constructor() {
        this.socket = io(environment.socketioUrl);
    }

    public sendMessage(messageBody, idResponse, idAuthor) {
        const currentTime = new Date();
        const message = {
            body: messageBody,
            idResponse,
            idAuthor,
            createdAt: currentTime
        };
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return new Observable<Message>(subscriber => {
            this.socket.on('new-message', (message) => {
                subscriber.next(message);
            });
        });
    }
}
