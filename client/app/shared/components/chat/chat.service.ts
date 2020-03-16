import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import * as io from 'socket.io-client';

import { Message } from '@app/models';

@Injectable({
    providedIn: 'root'
})
export class ChatService {
    private socket;
    private api = environment.apiUrl;

    constructor(private http: HttpClient) {
        this.socket = io(environment.socketioUrl);
    }

    public getAll(idResponse: number) {
        return this.http.get<Message[]>(`${this.api}/messages?idResponse=${idResponse}`);
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
                console.log(message);
                subscriber.next(message);
            });
        });
    }
}
