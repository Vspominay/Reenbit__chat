import { Chat } from './../../../shared/models/chat.model';
import { ContactService } from './../../services/contact.service';
import { Message } from './../../../shared/models/message.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

    id!: number;
    chat!: Chat;

    constructor(
        private route: ActivatedRoute,
        private contactService: ContactService,
    ) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.id = +params['id'];
                this.chat = this.contactService.getChat(this.id);
            })
    }

}
