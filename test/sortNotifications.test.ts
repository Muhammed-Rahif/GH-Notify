import { sortNotifications } from "../src/helpers/index";
import { RecursivePartial } from "./types";
import NotificationType from "./types/notifications";

describe("sort notifications", () => {
    const notifications: RecursivePartial<Array<NotificationType>> = [
        {
            updated_at: new Date(1637044469507).toString(),
        },
        {
            updated_at: new Date(1637044474086).toString(),
        },
        {
            updated_at: new Date(1637044428210).toString(),
        },
    ];
    let sortedNotifications: RecursivePartial<Array<NotificationType>>;

    beforeAll(() => {
        sortedNotifications = sortNotifications(notifications);
    });

    it("should return successfull sorted array", () => {
        return expect(
            JSON.stringify(sortedNotifications[0]?.updated_at) <
                JSON.stringify(sortedNotifications[1]?.updated_at)
        ).toBeTruthy();
    });
});
