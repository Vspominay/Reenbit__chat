import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ProfileLogoComponent } from './shared/components/profile-logo/profile-logo.component';
import { ChatListComponent } from './core/components/chat-list/chat-list.component';
import { PreviewChatComponent } from './core/components/preview-chat/preview-chat.component';
import { CropTextPipe } from './shared/pipes/crop-text.pipe';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileLogoComponent,
        ChatListComponent,
        PreviewChatComponent,
        CropTextPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
