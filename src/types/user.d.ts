import NotificationType from "./notifications";

interface UserModelType {
    username: string;
    personalAccessToken: string;
    lastReceivedOn: Date;
    joined: Date;
}

interface UserNotifications {
    username: string;
    personalAccessToken: string;
    notifications: Array<NotificationType>;
}

export { UserModelType, UserNotifications };
