import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
    private socket;

    constructor() {
        this.socket = io(environment.socketioUrl);
    }

    public sendMessage(message) {
        this.socket.emit('new-message', message);
    }

    public getMessages() {
        return new Observable(subscriber => {
            console.log('observable');
            this.socket.on('new-message', (message: string) => {
                subscriber.next(message);
            });
        });
    }
}
