export class NotificationData {
    androidNotificationId: number;
    displayType: number;
    isAppInFocus: boolean;
    payload: NotificationPayload;
    shown: boolean = false;
}

export class NotificationOpened{
    action: { type: number };
    notification : NotificationData;
}
export class NotificationPayload {
    body: string;
    fromProjectNumber: string;
    groupMessage: string;
    lockScreenVisibility: number
    notificationID: string;
    priority: string;
    rawPayload: string
    title: string;
}