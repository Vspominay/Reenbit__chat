import { ContactService } from './contact.service';
import { Chat } from './../../shared/models/chat.model';
import { NotificationCount } from './../../shared/models/notificationCount.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable, Injector } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    private storeNotification = new Map<number, number>();
    private newNotification = new Map<number, number>();

    storeNotificationChanged = new Subject<Map<number, number>>();
    currentChat = new BehaviorSubject<number>(-1);
    newNotificationChanged = new Subject<Map<number, number>>();

    constructor() { }

    updateNotifications(notification: NotificationCount) {
        let { chat_id, messageCount } = notification;

        this.storeNotification.set(chat_id, messageCount);
        this.storeNotificationChanged.next(this.storeNotification);
    }

    getCurrentChat() {
        return this.currentChat.getValue();
    }

    // updateChatStats() {

    //     let chats = this.injector.get(ContactService).getChats();

    //     for (const chat of chats) {
    //         let tempChatItem = localStorage.getItem(chat.id + 'n');

    //         if (tempChatItem) {
    //             let currentChat = this.getCurrentChat();
    //             let storeInfo = JSON.parse(tempChatItem);

    //             if (storeInfo.id !== chat.messages.length && currentChat !== chat.id) {
    //                 let subMesseges = chat.messages.length - storeInfo.messageCount;
    //                 if (subMesseges > 0) {
    //                     console.log({ chat, message: chat.messages.length - storeInfo.messageCount });
    //                 }
    //             }
    //         }
    //         else {
    //             localStorage.setItem(chat.id + 'n', JSON.stringify({ chat_id: chat.id, messageCount: chat.messages.length }));
    //         }
    //     }
    // }

    // compareNotifications(chat: number, currentCountMessages: number) {

    //     if (this.storeNotification.has(chat)) {
    //         let countMessages = this.storeNotification.get(chat) || currentCountMessages;
    //         let currentChat = this.currentChat.getValue();

    //         if (chat != currentChat && currentCountMessages != countMessages) {
    //             this.newNotification.set(chat, currentCountMessages - countMessages);
    //         }
    //         else {
    //             this.newNotification.delete(chat);
    //         }

    //         console.log(this.newNotification);

    //         this.newNotificationChanged.next(new Map(this.newNotification));
    //     }
    // }
}
