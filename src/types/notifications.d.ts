import { RestEndpointMethodTypes } from "@octokit/rest";

type NotificationType =
  RestEndpointMethodTypes["activity"]["listNotificationsForAuthenticatedUser"]["response"]["data"][0];

export default NotificationType;
