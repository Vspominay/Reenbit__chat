import { ContactService } from './../../services/contact.service';
import { Subscription } from 'rxjs';
import { NotificationCount } from './../../../shared/models/notificationCount.model';
import { NotificationService } from './../../services/notification.service';
import { ServerDataService } from './../../services/server-data.service';
import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { PreviewChat } from 'src/app/shared/models/preview-chat.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'app-preview-chat',
    templateUrl: './preview-chat.component.html',
    styleUrls: ['./preview-chat.component.scss']
})
export class PreviewChatComponent implements OnInit, OnDestroy {

    private notificationSub!: Subscription;

    @Input() previewData!: PreviewChat;
    @Input() messageCount!: number;


    constructor(
        private router: Router,
        private contactService: ContactService
    ) { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        if (this.notificationSub) {
            this.notificationSub.unsubscribe();
        }
    }

    setChat() {
        localStorage.removeItem(this.previewData.id + 'n');
        this.contactService.viewNewMessages(this.previewData.id);
        this.messageCount = 0;
        this.router.navigate(['chat', this.previewData.id]);
    }

    compareNotification() {
    }
}
