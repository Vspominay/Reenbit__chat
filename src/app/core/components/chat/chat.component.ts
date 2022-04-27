import { Subscription } from 'rxjs';
import { Chat } from './../../../shared/models/chat.model';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

    constructor(
        private route: ActivatedRoute,
        private contactService: ContactService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.route.params
            .subscribe((params: Params) => {
                this.id = +params['id'];
                this.chat = this.contactService.getChat(this.id);
            })
    }

    ngOnDestroy(): void {
        if (this.incomingMsgSub) {
            this.incomingMsgSub.unsubscribe();
        }
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            const storeId = this.chat.id;;
            const formValue = form.value;
            const newMessage = {
                text: formValue.messageField,
                date: new Date(),
                sender: false
            }


            this.contactService.onAddMessage(storeId, newMessage);
            form.reset();
            this.incomingMsgSub = this.contactService.getIncomingMessage()
                .subscribe(message => {
                    const randomIntervar = Math.round((10 * 1000) - 0.5 + Math.random() * (6 * 1000));

                    localStorage.setItem(this.id + "", storeId + "");
                    setTimeout(() => {
                        localStorage.removeItem(this.id + "");
                        this.contactService.onAddMessage(storeId, message);
                    }, randomIntervar);
                });
        }
    }

    backToList() {
        this.router.navigate(['../']);
    }

    getTypingPerson() {
        return localStorage.getItem(this.id + "");
    }
}
