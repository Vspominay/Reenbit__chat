import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile-logo',
    templateUrl: './profile-logo.component.html',
    styleUrls: ['./profile-logo.component.scss']
})
export class ProfileLogoComponent implements OnInit {


    @Input() online!: boolean;
    @Input() image!: string;

    constructor() { }

    ngOnInit(): void {
    }

}
