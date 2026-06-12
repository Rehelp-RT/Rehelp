import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';

import { io } from 'socket.io-client';

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

    public getAll(idHelp: number, idResponse?: number) {
        let url = `${this.api}/messages?idHelp=${idHelp}`;
        if (idResponse !== undefined) url += `&idResponse=${idResponse}`;
        return this.http.get<Message[]>(url);
    }

    public sendMessage(messageBody: string, idHelp: number, idAuthor: number, idResponse?: number) {
        const currentTime = new Date();
        const message: any = {
            body: messageBody,
            idHelp,
            idAuthor,
            createdAt: currentTime
        };
        if (idResponse !== undefined) message.idResponse = idResponse;
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return new Observable<Message>(subscriber => {
            this.socket.on('new-message', message => {
                subscriber.next(message);
            });
        });
    }
}
