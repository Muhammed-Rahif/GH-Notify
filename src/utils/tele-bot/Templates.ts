import { getReasonDescription } from "../github/reasons";

class Templates {
  static register = (fullName: string, url: string): string =>
    `Hello <b>${fullName}</b> 👋, It's a great to see you here.😊\n\nSo I will send you telegram notifications, <b>But to get access to your notifications on GitHub, I need your one github personal access token with the permission to access your notifications.</b>\nSo I will give you link to a form with the fields of '<i>GitHub username</i>' and your '<i>personal access token</i>'. Fill them without mistakes 🙏.\n\nHope that you are already starred ⭐️ our repo in github ☺️. If not, you can't complete the registration, so first star ⭐️ our repo <a href="https://github.com/Muhammed-Rahif/GH-Notify/stargazers"><b>from here!</b></a>\n\n<b><a href="${url}">Fill the form from here! 📝</a></b>\n\n<b>⚠️⚠️⚠️ And keep in mind this form is only for you, don't share this link with anyone else!!! ⚠️⚠️⚠️</b>\n\n\n ---- <a href="https://beomax1.herokuapp.com">More info!</a>`;

  static updateUser = (fullName: string, url: string): string =>
    `Hello <b>${fullName}</b> 👋,\n\nTo update your github personal access token please click the link, there you will find a form to update your personal access token.! ☺️\n\n<b><a href="${url}">Update your access token from here! 📝</a></b>`;

  static ghNotification = (
    title: string,
    type: string,
    reason: string,
    repo: string,
    username: string
  ) =>
    `<b>✉️ <u>${title}</u></b>\n\nIt's a <b><i>${type}😊!</i></b>\nThe reason you get this because of <b>${getReasonDescription(
      reason
    )}</b>\nRelated repository is <b><a href="https://github.com/${repo}">${repo}</a>.</b>\nRelated user is <b><a href="https://github.com/${username}">${username}</a>.</b>`;

  static alreadyExist = (fullName: string): string =>
    `Hello <b>${fullName} 👋,</b>\nIt seems like <b>you are already registered in this telegram user id. So you can't register as a new user 🤷!</b>\n\n<i>But if you are looking for updating your github personal access token ( If it has been changed, maybe because of expiring ), then you can send /update_access_token, then bot will give you a webpage form link to update your access token 😇!</i>`;

  static notRegistered = (fullName: string): string =>
    `Hello <b>${fullName}</b> 👋, It's very sad to see that you didn't registered with me! 🥺\n\nSo first you register by sending /register ( <b>It's completely free! 🎉</b> ) , then you can stop my service! 😏`;

  static serviceStopped = (): string =>
    `Got it! 👍️ <b>Your service is stopped 🥲!</b> And <b>your data has been removed from our server!</b>\n\n<i>You can re-register at any time if you want by sending /register.</i>\n\n<b>Thank you 🥀!</b>`;

  static serviceStopIgnored = (): string =>
    `Got it! 👍️ <b>Stop service action is ignored 😇!</b>`;

  static stopService = (fullName: string): string =>
    `Hello <b>${fullName} 👋</b>,\n<b>Are you sure to want stop our service 😟?!</b>\n\n<i>What will happen if you proceed with this action 🤨?\n1. You will not get github notification messages from me, for you.\n2.Your data that we stored in our database will be removed permenantly!</i>\n\n<b>Are you still want to proceed with this action 🤔???</b>`;

  static tokenInvalid = (fullName: string): string =>
    `Hello <b>${fullName} 👋</b>,\nIt seems like <b>your github access token is expired or invalid 😐!</b> \n\n<b>PLEASE UPDATE YOUR VALID GITHUB ACCESS TOKEN SOON BY SENDING /update_access_token!</b>`;

  static registrationCompleted = (fullName: string): string =>
    `Hello <b>${fullName} 👋</b>,\n\n<b>CONGRATULATIONS 🎉!</b>\nYou are successfully completed the registration! Now will get github notification through me 🥳! `;

  static tokenUpdationCompleted = (fullName: string): string =>
    `Hello <b>${fullName} 👋</b>,\n\n<b>CONGRATULATIONS 🎉!</b>\nYou are successfully updated your github access token 🥳! `;
}

export default Templates;
