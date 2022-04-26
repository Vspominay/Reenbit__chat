import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private contactService: ContactService) { }

    ngOnInit(): void {
    }

    onSearch(name: string) {
        this.contactService.searchValueChange.next(name);
    }
}
