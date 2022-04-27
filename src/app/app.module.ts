import { AuthInterceptorService } from './core/auth/auth-interceptor.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/components/header/header.component';
import { ProfileLogoComponent } from './shared/components/profile-logo/profile-logo.component';
import { ChatListComponent } from './core/components/chat-list/chat-list.component';
import { PreviewChatComponent } from './core/components/preview-chat/preview-chat.component';
import { CropTextPipe } from './shared/pipes/crop-text.pipe';
import { ChatComponent } from './core/components/chat/chat.component';
import { MessageComponent } from './core/components/chat/message/message.component';
import { AppChatComponent } from './core/components/app-chat/app-chat.component';
import { FormsModule } from '@angular/forms';
import { TypingLoaderComponent } from './shared/components/typing-loader/typing-loader.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
import { StartChatComponent } from './core/components/chat/start-chat/start-chat.component';
import { NotificationCountComponent } from './shared/components/notification-count/notification-count.component';
import { AuthComponent } from './core/auth/auth.component';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ProfileLogoComponent,
        ChatListComponent,
        PreviewChatComponent,
        CropTextPipe,
        ChatComponent,
        MessageComponent,
        AppChatComponent,
        TypingLoaderComponent,
        FilterPipe,
        StartChatComponent,
        NotificationCountComponent,
        AuthComponent,
        LoaderComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
    bootstrap: [AppComponent]
})
export class AppModule { }
