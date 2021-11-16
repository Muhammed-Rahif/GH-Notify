import { Octokit } from "@octokit/rest";
import UserModel from "../models/user";

const gh = new Octokit();

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

const sortNotifications = (notifications: Array<UserModelType>) => {
    return notifications.sort(
        (a, b) =>
            new Date(b.lastReceivedOn).valueOf() -
            new Date(a.lastReceivedOn).valueOf()
    );
};

export { getStarGazers, checkIfStargazer, sortNotifications };
