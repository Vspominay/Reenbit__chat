import { NotificationService } from './notification.service';
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

    private storeNotification = new Map<number, number>();
    storeNotificationChanged = new Subject<Map<number, number>>();

    constructor(
        private http: HttpClient,
        private injector: Injector,
        private notificationService: NotificationService) { }


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
        this.updateChatStats();

    }

    updateChatStats() {
        for (const chat of this.chats) {
            let tempChatItem = localStorage.getItem(chat.id + 'n');

            localStorage.setItem(chat.id + 'n', JSON.stringify({ chat_id: chat.id, messageCount: chat.messages.length }));
            if (tempChatItem) {
                let currentChat = this.notificationService.getCurrentChat();
                let storeInfo = JSON.parse(tempChatItem);

                if (storeInfo.id !== chat.messages.length && currentChat !== chat.id) {
                    let subMesseges = chat.messages.length - storeInfo.messageCount;
                    if (subMesseges > 0) {
                        if (this.storeNotification.has(chat.id)) {
                            this.storeNotification.set(chat.id, this.getNewMessageById(chat.id) + subMesseges);
                        }
                        else {
                            this.storeNotification.set(chat.id, subMesseges);
                        }
                        this.storeNotificationChanged.next(new Map(this.storeNotification));
                    }
                }
            }
        }
    }

    getNewMessageById(id: number) {
        return this.storeNotification.get(id) || 0;
    }

    getAllNewMessages() {
        return this.storeNotification;
    }

    viewNewMessages(id: number) {
        this.storeNotification.delete(id);
        this.storeNotificationChanged.next(this.storeNotification);
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

    checkNorification() {

    }

    private sortChats() {
        let sortedChats = this.chats.sort((a: any, b: any) => {
            return new Date(b.messages[b.messages.length - 1].date).getTime() - new Date(a.messages[a.messages.length - 1].date).getTime();
        });

        this.chatsChanges.next(sortedChats);
    }
}

