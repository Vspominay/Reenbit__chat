import { NotificationCount } from './notificationCount.model';
export interface PreviewChat {
    id: number,
    name: string,
    date: Date,
    text: string,
    messageCount: NotificationCount,
    image?: string,
    online?: boolean
}