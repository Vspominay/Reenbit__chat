import { AuthService } from './../../services/auth.service';
import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private contactService: ContactService,
        private authService: AuthService) { }

    ngOnInit(): void {
    }

    onSearch(name: string) {
        this.contactService.searchValueChange.next(name);
    }

    logout() {
        this.authService.logout();
    }
}
