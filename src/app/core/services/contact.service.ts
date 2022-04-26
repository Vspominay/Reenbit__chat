import { Chat } from './../../shared/models/chat.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    chatsChanges = new Subject<Chat[]>();

    private chats: Chat[] = [
        {
            name: 'Alice Freeman',
            image: '../../../../assets/img/girl.jpg',
            messages: [
                {
                    text: `I'm different, and I'm happy`,
                    date: new Date(2022, 3, 22, 11, 40),
                    sender: true
                },
                {
                    text: `But you pretend that you aren't different`,
                    date: new Date(2022, 3, 22, 11, 43),
                    sender: false
                },
                {
                    text: `I'm different, and I like being different`,
                    date: new Date(2022, 3, 22, 11, 44),
                    sender: false
                },
                {
                    text: `Maybe I don't like being different`,
                    date: new Date(2022, 3, 22, 11, 45),
                    sender: true
                },

            ],
            online: true
        },
        {
            name: 'Josef',
            image: '../../../../assets/img/men.jpg',
            messages: [
                {
                    text: `Did you see the last season of Game of Thrones? `,
                    date: new Date(2022, 3, 23, 8, 40),
                    sender: true
                },
                {
                    text: `Yep.. I’ve got to say, I’m a little disappointed. I thought it would be better.`,
                    date: new Date(2022, 3, 23, 8, 43),
                    sender: false
                },
                {
                    text: `Me too. It felt so rushed. They tried to do too much. But.. the special effects were amazing. I mean.. that dragon scene was epic.. It looked so real.`,
                    date: new Date(2022, 3, 23, 8, 44),
                    sender: false
                },
                {
                    text: `Shocking wasn’t it. They burnt everyone alive.`,
                    date: new Date(2022, 3, 23, 8, 45),
                    sender: true
                },
                {
                    text: `Well. Now that the season is done I need something new to watch. Any recommendations?`,
                    date: new Date(2022, 3, 24, 1, 34),
                    sender: false
                },
                {
                    text: `Did you see Wu-Tang?`,
                    date: new Date(2022, 3, 24, 1, 38),
                    sender: true
                },
                {
                    text: `What’s that? Wu- Tang? As in the rap group?`,
                    date: new Date(2022, 3, 24, 1, 43),
                    sender: false
                },
                {
                    text: `Yeah. they have a tv series. It’s pretty cool.`,
                    date: new Date(2022, 3, 24, 1, 46),
                    sender: true
                },

            ],
            online: false
        },
    ]

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

    constructor() { }
}
