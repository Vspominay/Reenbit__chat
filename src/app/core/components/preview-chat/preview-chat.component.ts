import { ServerDataService } from './../../services/server-data.service';
import { Component, OnInit, Input } from '@angular/core';
import { PreviewChat } from 'src/app/shared/models/preview-chat.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-preview-chat',
    templateUrl: './preview-chat.component.html',
    styleUrls: ['./preview-chat.component.scss']
})
export class PreviewChatComponent implements OnInit {

    @Input() index!: number;
    @Input() previewData!: PreviewChat;

    constructor(
        private serverDataService: ServerDataService,
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    setChat() {
        this.router.navigate(['chat', this.index]);
    }
}
