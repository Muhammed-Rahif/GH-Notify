import { Context, Telegraf } from "telegraf";
import { InlineKeyboardMarkup, Update } from "typegram";
import {
    checkIfStargazer,
    getAllUsers,
    getNewNotificationsForUser,
    getStarGazers,
    updateUser,
} from "../helpers";
import { UserModelType } from "../types/user";
import Templates from "../utils/tele-bot/templates";
import JWT from "jsonwebtoken";
import NotificationType from "../types/notifications";
import axios from "axios";

function setUpBot(bot: Telegraf<Context<Update>>) {
    setupRegistration(bot);

    setInterval(async () => {
        console.log("Updating telegram notifications!");
        try {
            await sendAllNewNotifications(bot);
        } catch (err) {
            bot.telegram.sendMessage(
                process.env.AUTHOR_ID as string,
                err as string
            );
        }
    }, 10000);
}

const setupRegistration = (bot: Telegraf<Context<Update>>) =>
    bot.command(["register", "start"], ctx => {
        if (ctx.from.is_bot) return ctx.reply("Bot's not allowed!");

        const token = JWT.sign(
            { userId: ctx.from.id },
            process.env.JWT_SCECRET_KEY as string,
            {
                expiresIn: "30d",
            }
        );

        ctx.reply(
            Templates.register(
                ctx.from.first_name,
                `https://beomax1.herokuapp.com/register?token=${token}`
            ),
            {
                parse_mode: "HTML",
                reply_to_message_id: ctx.message.message_id,
            }
        );
    });

const sendAllNewNotifications = (bot: Telegraf<Context<Update>>) =>
    new Promise(async (resolve, reject) => {
        let validUsers: Array<UserModelType> = [];

        // Getting all users list from db
        try {
            let stargazers = await getStarGazers();
            validUsers = (await getAllUsers(
                stargazers as Array<string>
            )) as Array<UserModelType>;
        } catch (err) {
            reject(err);
        }

        // Getting valid users notifications and sending to them
        validUsers.map(async user => {
            let userNotifications: Array<NotificationType> = [];

            try {
                userNotifications = (await getNewNotificationsForUser(
                    user
                )) as Array<NotificationType>;
            } catch (err) {
                reject(err);
            }

            userNotifications.map(async notification => {
                let details;
                if (notification.subject.url) {
                    // Get notification url
                    try {
                        const { data } = await axios.get(
                            notification.subject.url
                        );
                        details = data;
                    } catch (err) {
                        reject(err);
                    }

                    // Send notification for a specific user
                    sendNotificationForUser(
                        bot,
                        user.userId,
                        Templates.notification(
                            notification.subject.title,
                            notification.subject.type,
                            notification.reason
                        ),
                        notification.updated_at,
                        user.username,
                        details.html_url
                    ).catch(reject);
                } // Send notification for a specific user
                else
                    sendNotificationForUser(
                        bot,
                        user.userId,
                        Templates.notification(
                            notification.subject.title,
                            notification.subject.type,
                            notification.reason
                        ),
                        notification.updated_at,
                        user.username
                    ).catch(reject);
            });
        });
    });

const sendNotificationForUser = (
    bot: Telegraf<Context<Update>>,
    userId: number,
    msg: string,
    updatedAt: string | Date,
    username: string,
    url?: string
) =>
    new Promise((resolve, reject) => {
        updatedAt = new Date(updatedAt);
        // Creating btns to sending with message
        let buttons: InlineKeyboardMarkup | undefined;
        if (url) {
            buttons = {
                inline_keyboard: [
                    [
                        {
                            text: "View",
                            url: url,
                        },
                    ],
                ],
            };
        }

        // Sending msg to user
        bot.telegram
            .sendMessage(userId, msg, {
                parse_mode: "HTML",
                reply_markup: buttons,
            })
            .then(response => {
                updateUser(username, { lastReceivedOn: updatedAt })
                    .then(resolve)
                    .catch(reject);
            })
            .catch(reject);
    });

export { setUpBot };
