import { Joke } from './../../shared/models/joke.model';
import { httpOptions } from './httpOptions';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ServerDataService } from './server-data.service';
import { Message } from './../../shared/models/message.model';
import { Chat } from './../../shared/models/chat.model';
import { Injectable, Injector } from '@angular/core';
import { map, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    chatsChanges = new Subject<Chat[]>();

    private chats: Chat[] = []

    constructor(private http: HttpClient, private injector: Injector) { }


    getChats() {
        return this.chats.slice();
    }

    setChats(chats: Chat[]) {
        this.chats = chats;
        this.chatsChanges.next(this.chats.slice());
    }

    getChat(index: number) {
        return this.chats[index];
    }

    onAddMessage(index: number, message: Message) {
        this.chats[index].messages.push(message);
        this.chatsChanges.next(this.chats.slice());

        this.injector.get(ServerDataService).saveChats();
    }

    getIncomingMessage() {
        return this.http.get<Joke>(`${environment.CHUCK_API}`, httpOptions)
            .pipe(
                map(response => {
                    return {
                        text: response.value,
                        date: new Date(),
                        sender: true
                    };
                })
            )
    }
}

