import { Message } from './../../../../shared/models/message.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

    @Input() senderImage!: string;
    @Input() message!: Message;

    mobileSize = window.innerWidth <= 768;

    constructor() { }

    ngOnInit(): void {
    }

}
