import { ServerDataService } from './../../services/server-data.service';
import { Chat } from './../../../shared/models/chat.model';
import { ContactService } from './../../services/contact.service';
import { PreviewChat } from './../../../shared/models/preview-chat.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnDestroy {
    private chatsChangeSub!: Subscription;
    private chatsGetSub!: Subscription;

    chats!: PreviewChat[];

    constructor(private contactService: ContactService, private serverDataService: ServerDataService) { }

    ngOnInit(): void {
        this.chatsChangeSub = this.contactService.chatsChanges
            .subscribe((chats: Chat[]) => {
                this.chats = (this.generateChats(chats));
            })

        this.chatsGetSub = this.serverDataService.fetchChats()
            .subscribe(chats => {
                this.chats = this.generateChats(chats);
            });
    }

    ngOnDestroy(): void {
        this.chatsChangeSub.unsubscribe();
        this.chatsGetSub.unsubscribe();
    }

    private generateChats(chats: Chat[]) {

        let resultPreview: PreviewChat[] = [];

        for (const chat of chats) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            let tempPreview: PreviewChat = {} as PreviewChat;

            tempPreview.date = lastMessage.date;
            tempPreview.text = lastMessage.text;
            tempPreview.image = chat.image;
            tempPreview.name = chat.name;
            tempPreview.online = chat.online;

            resultPreview.push(tempPreview);
        }

        return resultPreview;
    }

}
