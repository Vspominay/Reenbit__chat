import { ServerDataService } from './../../services/server-data.service';
import { Chat } from './../../../shared/models/chat.model';
import { ContactService } from './../../services/contact.service';
import { PreviewChat } from './../../../shared/models/preview-chat.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss'],
    providers: [FilterPipe]
})
export class ChatListComponent implements OnInit, OnDestroy {
    private chatsChangeSub!: Subscription;
    private chatsGetSub!: Subscription;
    private filterSub!: Subscription;
    private notificationSub!: Subscription;

    searchString: string = '';
    chats!: PreviewChat[];
    filteredChats: PreviewChat[] = [];
    newMessages: Map<number, number> = new Map();

    constructor(
        private contactService: ContactService,
        private serverDataService: ServerDataService,
        private filterPipe: FilterPipe) { }

    ngOnInit(): void {
        this.chatsChangeSub = this.contactService.chatsChanges
            .subscribe((chats: Chat[]) => {
                this.chats = this.generateChats(chats);
            })

        this.chatsGetSub = this.serverDataService.fetchChats()
            .subscribe(chats => {
                this.chats = this.generateChats(chats);
            });

        this.filterSub = this.contactService.searchValueChange
            .subscribe(term => {
                this.searchString = term;
                this.filterChats();
            });

        this.notificationSub = this.contactService.storeNotificationChanged
            .subscribe((map) => {
                this.newMessages = map;
            })
    }

    ngOnDestroy(): void {
        this.chatsChangeSub.unsubscribe();
        this.chatsGetSub.unsubscribe();
        this.filterSub.unsubscribe();
        this.notificationSub.unsubscribe();
    }

    filterChats() {
        this.filteredChats = this.filterPipe.transform(this.chats, this.searchString, 'name');
    }

    private generateChats(chats: Chat[]) {

        let resultPreview: PreviewChat[] = [];

        for (const chat of chats) {
            const lastMessage = chat.messages[chat.messages.length - 1];
            let tempPreview: PreviewChat = {} as PreviewChat;

            tempPreview.date = lastMessage.date;
            tempPreview.text = lastMessage.text;
            tempPreview.id = chat.id;
            tempPreview.image = chat.image;
            tempPreview.name = chat.name;
            tempPreview.online = chat.online;
            tempPreview.messageCount = { chat_id: chat.id, messageCount: chat.messages.length };

            resultPreview.push(tempPreview);
        }

        return resultPreview;
    }

}
