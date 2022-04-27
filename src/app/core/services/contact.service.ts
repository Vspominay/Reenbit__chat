import { Joke } from './../../shared/models/joke.model';
import { httpOptions } from './httpOptions';
import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { ServerDataService } from './server-data.service';
import { Message } from './../../shared/models/message.model';
import { Chat } from './../../shared/models/chat.model';
import { Injectable, Injector } from '@angular/core';
import { map, Subject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    searchValueChange = new Subject<string>();

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

    getChat(id: number) {
        return this.chats.filter(chat => chat.id === id)[0];
    }

    onAddMessage(id: number, message: Message) {

        for (const chat of this.chats) {
            if (chat.id === id) {
                chat.messages.push(message);
            }
        }

        this.chatsChanges.next(this.chats.slice());

        this.injector.get(ServerDataService).saveChats();

        this.sortChats();
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

    private sortChats() {
        let sortedChats = this.chats.sort((a: any, b: any) => {
            return new Date(b.messages[b.messages.length - 1].date).getTime() - new Date(a.messages[a.messages.length - 1].date).getTime();
        });

        this.chatsChanges.next(sortedChats);
    }
}

