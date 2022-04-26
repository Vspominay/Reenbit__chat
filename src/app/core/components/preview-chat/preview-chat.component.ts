import { Component, OnInit, Input } from '@angular/core';
import { PreviewChat } from 'src/app/shared/models/preview-chat.model';

@Component({
    selector: 'app-preview-chat',
    templateUrl: './preview-chat.component.html',
    styleUrls: ['./preview-chat.component.scss']
})
export class PreviewChatComponent implements OnInit {

    @Input() previewData!: PreviewChat;

    constructor() { }

    ngOnInit(): void {
    }

}
