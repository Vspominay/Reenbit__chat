import { Message } from './message.model';

export interface Chat {
    name: string,
    image: string,
    messages: Message[],
    online: boolean
}