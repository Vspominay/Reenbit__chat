import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-typing-loader',
    template: `<div class="loader">
                <span></span>
                <span></span>
                <span></span>
            </div>`,
    styleUrls: ['./typing-loader.component.scss']
})
export class TypingLoaderComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

}
