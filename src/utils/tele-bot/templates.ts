import { getReasonDesc } from "../github/reasons";

class Templates {
    static register = (fullName: string, url: string): string =>
        `<b>༺♥༻❀༺♥༻</b>\n\nHello <b>${fullName}</b>,\nYou need to register to get started with us.!\n<b><a href="${url}">Register from here!</a></b>\n\n<b>༺♥༻❀༺♥༻</b>`;
    static notification = (title: string, type: string, reason: string) =>
        `<b>◤▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼▼◥</b>\n<b>Title : ${title}</b>\nType : ${type}\nReason : ${getReasonDesc(
            reason
        )}\n<b>◣▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲◢</b>`;
}

export default Templates;
