import { Octokit } from "@octokit/rest";
import { RecursivePartial } from "../types";
import NotificationType from "../types/notifications";
import UserModel from "../models/user";
import { UserModelType } from "../types/user";
import dotenv from "dotenv";

// Env variables
dotenv.config({ path: "src/config/.env" });

const gh = new Octokit({ auth: process.env.GH_AUTH_TOKEN });

const getStarGazers = (): Promise<null | Array<string | undefined>> =>
    new Promise((resolve, reject) => {
        let starGazers = [];
        gh.activity
            .listStargazersForRepo({
                owner: "Muhammed-Rahif",
                repo: "GH-Notify",
            })
            .then(response => {
                starGazers = response.data.map(user => user?.login);
                resolve(starGazers);
            })
            .catch(reject);
    });

const checkIfStargazer = (user: string): Promise<boolean | undefined> =>
    new Promise((resolve, reject) => {
        user = user.trim();
        getStarGazers()
            .then(starGazers => resolve(starGazers?.includes(user)))
            .catch(reject);
    });

const sortNotifications = (
    notifications: RecursivePartial<Array<NotificationType>>
) => {
    return notifications.sort(
        (a, b) =>
            new Date(a?.updated_at as string).valueOf() -
            new Date(b?.updated_at as string).valueOf()
    );
};

const getNewNotificationsForUser = (
    validUser: UserModelType
): Promise<Array<NotificationType>> =>
    new Promise(async (resolve, reject) => {
        let userNotifications: Array<NotificationType> = [];

        const gh = new Octokit({ auth: validUser.personalAccessToken });

        // Getting all notifications for a user
        try {
            userNotifications = (
                await gh.activity.listNotificationsForAuthenticatedUser()
            ).data;
        } catch (err) {
            console.log(err);
        }

        if (userNotifications.length === 0)
            console.log(
                `${validUser.username} don't have any new notifications on github!`
            ); // fix erro throwing when pAT expires or not valid

        // filtering new notifications for a user ( Already sended notifications will be removed )
        let userNewNotifications = userNotifications.filter(notification => {
            if (new Date(notification.updated_at) > validUser.lastReceivedOn)
                return notification;
            else
                console.log(
                    `${validUser.username} don't have any new notifications on telegram!`
                );
        });
        resolve(userNewNotifications);
    });

const getAllUsers = (usernames?: Array<string>) =>
    new Promise((resolve, reject) => {
        let query = usernames ? { username: { $in: usernames } } : {};
        UserModel.find(query).then(resolve).catch(reject);
    });

const updateUserData = (
    username: string,
    data: RecursivePartial<UserModelType>
) =>
    new Promise((resolve, reject) => {
        UserModel.findOneAndUpdate({ username }, { ...data })
            .then(resolve)
            .catch(reject);
    });

const getUserData = (
    query: RecursivePartial<UserModelType>
): Promise<UserModelType> =>
    new Promise((resolve, reject) => {
        UserModel.findOne(query).then(resolve).catch(reject);
    });

export {
    getStarGazers,
    checkIfStargazer,
    sortNotifications,
    getNewNotificationsForUser,
    getAllUsers,
    updateUserData,
    getUserData,
};
