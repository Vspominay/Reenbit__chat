import { environment } from './../../../environments/environment';
import { ContactService } from './contact.service';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


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
        return this.http.put(`${environment.DB_URL}/chats.json`, chats, this.httpOptions)
    }

    private httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
}
