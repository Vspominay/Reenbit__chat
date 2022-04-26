import { PreviewChat } from './../../../shared/models/preview-chat.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {

    chats: PreviewChat[] = [
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
        {
            name: 'Aclice Freeman',
            date: new Date(),
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.Fugit veritatis mollitia eum beatae modi dignissimos voluptatibus sint! Reprehenderit, possimus unde maxime perspiciatis harum eligendi explicabo ipsum deserunt quis ipsa tenetur.',
            image: '../../../../assets/img/girl.jpg'
        },
    ];

    constructor() { }

    ngOnInit(): void {
    }

}
