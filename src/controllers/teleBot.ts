import { Context, Telegraf } from "telegraf";
import { InlineKeyboardMarkup, Update } from "typegram";
import {
  checkIfStargazer,
  deleteUserData,
  getAllUsers,
  getNewNotificationsForUser,
  getStarGazers,
  getUserData,
  updateUserData,
} from "../helpers";
import { UserModelType } from "../types/user";
import Templates from "../utils/tele-bot/Templates";
import JWT from "jsonwebtoken";
import NotificationType from "../types/notifications";
import axios from "axios";

function setUpBot(bot: Telegraf<Context<Update>>) {
  setupRegistration(bot);
  setupUpdationUserData(bot);
  setupStopUserService(bot);

  setInterval(async () => {
    console.log("Updating telegram notifications!");
    try {
      await sendAllNewNotifications(bot);
    } catch (err) {
      bot.telegram.sendMessage(process.env.AUTHOR_ID as string, err as string);
    }
  }, 10000);
}

const setupRegistration = (bot: Telegraf<Context<Update>>) =>
  bot.command(["register", "start"], async ctx => {
    if (ctx.from.is_bot) return ctx.reply("Bot's not allowed!");

    // Checking if this tele user already exist
    try {
      const userExist = await getUserData({ userId: ctx.from.id });
      if (userExist && userExist.userId)
        return ctx.reply(Templates.alreadyExist(ctx.from.first_name), {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        });
    } catch (err) {
      bot.telegram.sendMessage(process.env.AUTHOR_ID as string, err as string);
    }

    const token = JWT.sign(
      { userId: ctx.from.id },
      process.env.JWT_SCECRET_KEY as string,
      {
        expiresIn: "30d",
      }
    );

    const registerUrl: string = `https://beomax1.herokuapp.com/register?token=${token}`;

    // Creating btns for reply msg
    let buttons: InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          {
            text: "Register personal access token 📝",
            url: registerUrl,
          },
        ],
        [
          {
            text: "How to setup ℹ️",
            url: "https://beomax1.herokuapp.com",
          },
        ],
      ],
    };

    ctx.reply(Templates.register(ctx.from.first_name, registerUrl), {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
      reply_markup: buttons,
    });
  });

const setupUpdationUserData = (bot: Telegraf<Context<Update>>) =>
  bot.command(["update_access_token"], async ctx => {
    let username: string = "";

    if (ctx.from.is_bot) return ctx.reply("Bot's not allowed!");

    // Checking if this tele user already exist
    try {
      const userExist = await getUserData({ userId: ctx.from.id });
      if (!userExist)
        return ctx.reply(Templates.notRegistered(ctx.from.first_name), {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        });
      username = userExist.username;
    } catch (err) {
      bot.telegram.sendMessage(process.env.AUTHOR_ID as string, err as string);
    }

    const token = JWT.sign(
      { userId: ctx.from.id, username },
      process.env.JWT_SCECRET_KEY as string,
      {
        expiresIn: "30d",
      }
    );

    const updateFormUrl: string = `https://beomax1.herokuapp.com/update-access-token?token=${token}`;

    // Creating btns for reply msg
    let buttons: InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          {
            text: "Update personal access token 📝",
            url: updateFormUrl,
          },
        ],
      ],
    };

    ctx.reply(Templates.updateUser(ctx.from.first_name, updateFormUrl), {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
      reply_markup: buttons,
    });
  });

const setupStopUserService = (bot: Telegraf<Context<Update>>) =>
  bot.command(["stop_service"], async ctx => {
    let username: string = "";

    if (ctx.from.is_bot) return ctx.reply("Bot's not allowed!");

    // Checking if this tele user already exist
    try {
      const userExist = await getUserData({ userId: ctx.from.id });
      if (!userExist)
        return ctx.reply(Templates.notRegistered(ctx.from.first_name), {
          parse_mode: "HTML",
          reply_to_message_id: ctx.message.message_id,
        });
      username = userExist.username;
    } catch (err) {
      bot.telegram.sendMessage(process.env.AUTHOR_ID as string, err as string);
    }

    // Creating btns for reply msg
    let buttons: InlineKeyboardMarkup = {
      inline_keyboard: [
        [
          {
            text: "Yes, stop it 😾!",
            callback_data: "stop_user_service_now",
          },
          {
            text: "Nop 🙅, ignore it!",
            callback_data: "ignore_stop_user_service",
          },
        ],
      ],
    };

    // Stop service
    bot.action("stop_user_service_now", async ctx => {
      const deletedUser = await deleteUserData({ userId: ctx.from?.id });
      console.log(`${deletedUser.username} has stopped thier service!`);

      return ctx.editMessageText(Templates.serviceStopped(), {
        parse_mode: "HTML",
      });
    });

    // Ignore action
    bot.action("ignore_stop_user_service", ctx =>
      ctx.editMessageText(Templates.serviceStopIgnored(), {
        parse_mode: "HTML",
      })
    );

    // Send confirm message
    ctx.reply(Templates.stopService(ctx.from.first_name), {
      parse_mode: "HTML",
      reply_to_message_id: ctx.message.message_id,
      reply_markup: buttons,
    });
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
            const { data } = await axios.get(notification.subject.url);
            details = data;
          } catch (err) {
            reject(err);
          }

          // Send notification for a specific user
          sendNotificationForUser(
            bot,
            user.userId,
            Templates.ghNotification(
              notification.subject.title,
              notification.subject.type,
              notification.reason,
              notification.repository.full_name,
              details.user.login
            ),
            notification.updated_at,
            user.username,
            notification.repository.full_name,
            details.html_url
          ).catch(reject);
        } // Send notification for a specific user
        else
          sendNotificationForUser(
            bot,
            user.userId,
            Templates.ghNotification(
              notification.subject.title,
              notification.subject.type,
              notification.reason,
              notification.repository.full_name,
              notification.repository.owner.login
            ),
            notification.updated_at,
            user.username,
            notification.repository.full_name
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
  repo: string,
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
              text: "View notification 👀",
              url: url,
            },
          ],
          [
            {
              text: "View repository 📘",
              url: `https://github.com/${repo}`,
            },
            {
              text: "View user 👤",
              url: `https://github.com/${username}`,
            },
          ],
        ],
      };
    } else {
      buttons = {
        inline_keyboard: [
          [
            {
              text: "View repository 📘",
              url: `https://github.com/${repo}`,
            },
            {
              text: "View user 👤",
              url: `https://github.com/${username}`,
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
        updateUserData(username, { lastReceivedOn: updatedAt })
          .then(resolve)
          .catch(reject);
      })
      .catch(reject);
  });

const sendMsgForUser = (
  bot: Telegraf<Context<Update>>,
  userId: number,
  msg: string
) =>
  new Promise((resolve, reject) => {
    // Sending msg to user
    bot.telegram
      .sendMessage(userId, msg, {
        parse_mode: "HTML",
      })
      .then(resolve)
      .catch(reject);
  });

export { setUpBot, sendMsgForUser };
