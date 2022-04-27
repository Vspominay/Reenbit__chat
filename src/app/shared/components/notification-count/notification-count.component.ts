import { ContactService } from './../../../core/services/contact.service';
import { Chat } from './../../models/chat.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-notification-count',
    templateUrl: './notification-count.component.html',
    styleUrls: ['./notification-count.component.scss']
})
export class NotificationCountComponent implements OnInit {

    @Input() countMessage !: number;

    constructor() { }

    ngOnInit(): void {
    }
}
