import { Octokit } from "@octokit/rest";

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

export { getStarGazers };
