import { StartChatComponent } from './core/components/chat/start-chat/start-chat.component';
import { ChatsResolverService } from './core/services/chats-resolver.service';
import { ChatComponent } from './core/components/chat/chat.component';
import { AppChatComponent } from './core/components/app-chat/app-chat.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: 'chat', component: AppChatComponent, children:
            [
                { path: ':id', component: ChatComponent, resolve: [ChatsResolverService] },
                { path: '', component: StartChatComponent },
            ]
    },
    { path: '', redirectTo: '/chat', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
