import { getReasonDesc } from "../github/reasons";

class Templates {
    static register = (fullName: string, url: string): string =>
        `<b>༺♥༻❀༺♥༻</b>\n\nHello <b>${fullName}</b>,\nYou need to register to get started with us.!\n<b><a href="${url}">Register from here!</a></b>\n\n<b>༺♥༻❀༺♥༻</b>`;
    static updateUser = (fullName: string, url: string): string =>
        `<b>- ––––•(-• •-)•–––– -</b>\n\nHello <b>${fullName}</b>,\nTo update your data please click the link, there you will find a form to update your profile.!\n<b><a href="${url}">Update your data from here!</a></b>\n\n<b>◄ ◊ ►</b>`;
    static notification = (title: string, type: string, reason: string) =>
        `<b>◤▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼◥</b>\n<b>Title : ${title}</b>\nType : ${type}\nReason : ${getReasonDesc(
            reason
        )}\n<b>◣▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲◢</b>`;
    static alreadyExist = (): string =>
        `<b>User already exist on this telegram user id, can't register as a new user. But you can edit your data by sending /update_data, then bot will give you a webpage link to edit your data.</b>`;
}

export default Templates;
