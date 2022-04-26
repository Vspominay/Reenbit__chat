import { Subscription } from 'rxjs';
import { Chat } from './../../../shared/models/chat.model';
import { ContactService } from './../../services/contact.service';
import { Message } from './../../../shared/models/message.model';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

    @ViewChild('onSubmit', { static: false }) sendForm!: NgForm;

    private incomingMsgSub!: Subscription;

    id!: number;
    chat!: Chat;
    incomingTyping: boolean = false;

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

    ngOnDestroy(): void {
        this.incomingMsgSub.unsubscribe();
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const formValue = form.value;
            const newMessage = {
                text: formValue.messageField,
                date: new Date(),
                sender: false
            }

            this.contactService.onAddMessage(this.id, newMessage);
            form.reset();
            this.incomingMsgSub = this.contactService.getIncomingMessage()
                .subscribe(message => {
                    const randomIntervar = Math.round((10 * 1000) - 0.5 + Math.random() * (6 * 1000));
                    this.incomingTyping = true;
                    setTimeout(() => {
                        this.incomingTyping = false;
                        this.contactService.onAddMessage(this.id, message);
                    }, randomIntervar);
                });
        }
    }
}
