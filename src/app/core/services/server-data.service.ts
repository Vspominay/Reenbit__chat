import { httpOptions } from './httpOptions';
import { Chat } from './../../shared/models/chat.model';
import { environment } from './../../../environments/environment';
import { ContactService } from './contact.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class ServerDataService {

    constructor(
        private contactService: ContactService,
        private http: HttpClient
    ) { }

    saveChats() {
        const chats = this.contactService.getChats();
        return this.http.put(`${environment.DB_URL}/chats.json`, chats, httpOptions).subscribe();
    }

    fetchChats() {
        return this.http.get<Chat[]>(`${environment.DB_URL}/chats.json`, httpOptions)
            .pipe(
                tap(chats => {
                    this.contactService.setChats(chats);
                })
            );
    }




}
