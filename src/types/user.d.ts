import NotificationType from "./notifications";

interface UserModelType {
  username: string;
  personalAccessToken: string;
  lastReceivedOn: Date;
  joined: Date;
  userId: number;
}

interface UserNotification {
  username: string;
  personalAccessToken: string;
  notifications: Array<NotificationType>;
}

export { UserModelType, UserNotification };
