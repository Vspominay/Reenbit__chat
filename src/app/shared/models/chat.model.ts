import { Message } from './message.model';

export interface Chat {
    id: number,
    name: string,
    image: string,
    messages: Message[],
    online: boolean
}