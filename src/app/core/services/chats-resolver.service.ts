import { ContactService } from './contact.service';
import { ServerDataService } from './server-data.service';
import { Chat } from './../../shared/models/chat.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ChatsResolverService implements Resolve<Chat[]> {

    constructor(
        private serverDataService: ServerDataService,
        private contactService: ContactService,

    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Chat[] | Observable<Chat[]> | Promise<Chat[]> {
        const chats = this.contactService.getChats();

        if (chats.length === 0)
            return this.serverDataService.fetchChats();
        else
            return chats;
    }
}
